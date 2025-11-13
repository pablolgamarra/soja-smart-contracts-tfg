import { useState } from "react";
import { useWeb3Context } from "@hooks/useWeb3Context";
import { InputField } from "@components/common/InputField"; // Componente de InputField
import SelectField from "@components/common/SelectField";
import Button from "@components/common/Button";
import Section from "@components/common/Section";
import { Briefcase, DollarSign, FileText, Package, Truck, User } from "lucide-react";
import { Link } from "react-router-dom";
import { TipoContrato } from "@constants/TipoContrato";
import ContratoService from "@services/ContratoService";
import OTPService from "@services/OTPService";
import type { Contrato } from "@types/Contrato";

export interface IFormContratoRegisterState {
    // IDENTIFICADORES
    id?: number;
    billeteraComprador: string;
    billeteraVendedor: string;
    billeteraBroker: string;
    nombreComprador: string;
    nombreVendedor: string;
    nombreBroker: string;
    nroFiscalComprador: string;
    nroFiscalVendedor: string;
    nroFiscalBroker: string;
    emailComprador: string;
    telefonoComprador: string;
    emailVendedor: string;
    telefonoVendedor: string;

    // CONDICIONES DEL GRANO
    cantidadToneladas: number;
    tipoGrano: string;
    cosecha: string;

    // CONDICIONES DE ENTREGA
    empaque: string;
    fechaEntregaInicio: string;
    fechaEntregaFin: string;

    // CONDICIONES DE PRECIO
    tipoContrato: TipoContrato;
    precioPorToneladaMetrica: number;
    precioCBOTBushel: number;
    ajusteCBOT: number; // al par=0 / más=1 / menos=-1
    fechaPrecioChicago: string;
    incoterm: string;
    precioFinal: number;

    // CONDICIONES EMBARQUE
    puertoEmbarque: string;
    destinoFinal: string;

    // CONDICIONES CONTRATO
    hashVersionContrato: string;
    evidenceURI: string;
    fechaCelebracionContrato: number;
    estado: EstadoContrato;
    clausulasAdicionales: Array<{ clausula: string, CID: string }>
}

const FormContratoRegister: React.FC = () => {
    const [formState, setFormState] = useState<IFormContratoRegisterState>({} as IFormContratoRegisterState);
    const web3Context = useWeb3Context();

    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormState(prev => ({ ...prev, [ name ]: value }));
    };

    const handleClausulaChange = (index, field, value) => {
        const newClausulas = [ ...formState.clausulasAdicionales ];
        newClausulas[ index ] = { ...newClausulas[ index ], [ field ]: value };
        setFormState(prev => ({ ...prev, clausulasAdicionales: newClausulas }));
    };

    const addClausula = () => {
        setFormState(prev => ({
            ...prev,
            clausulasAdicionales: [ ...(prev.clausulasAdicionales || []), { clausula: '', CID: '' } ]
        }));
    };

    const removeClausula = (index:number) => {
        setFormState(prev => ({
            ...prev,
            clausulasAdicionales: prev.clausulasAdicionales.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!web3Context.isConnected) {
            alert("Por favor, conecte su wallet antes de continuar.");
            return;
        }

        if (!web3Context.deployedContract || !web3Context.signer) {
            alert("Contrato o signer no inicializado.");
            return;
        }

        // ESTADO DE PRUEBA PARA TESTEOS
        // const testState = {
        //         "billeteraComprador": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        //         "nroFiscalComprador": "123456789-0",
        //         "nombreComprador": "Glymax",
        //         "billeteraVendedor": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        //         "nroFiscalVendedor": "6090356-0",
        //         "nombreVendedor": "Lorenzo Escobar",
        //         "billeterabroker": "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
        //         "nroFiscalBroker": "1597538426-0",
        //         "nombreBroker": "Lorenzeti",
        //         "emailComprador": "pablogamarra@glymax.com",
        //         "telefonoComprador": "595993373436",
        //         "emailVendedor": "pablogamarra@glymax.com",
        //         "telefonoVendedor": "595993373436",

        //         "cantidadToneladasMetricas": 0,
        //         "tipoGrano": "Soja",
        //         "cosecha": "2025",
        //         "empaque": "Granel",
        //         "fechaEntregaInicio": "2025-11-13",
        //         "fechaEntregaFin": "2025-11-13",
        //         "tipoContrato": TipoContrato.PrecioFijo,
        //         "precioPorToneladaMetrica": 159753,
        //         "precioCBOTBushel": 0,
        //         "ajusteCBOT": 0,
        //         "fechaPrecioChicago": "2025-11-13",
        //         "incoterm": "FOB",
        //         "precioFinal": 159753,
        //         "puertoEmbarque": "Puerto Rosario",
        //         "destinoFinal": "Copenhagen",
        //     "hashVersionContrato": "hashVersionContrato_v1",
        //     "evidenceURI": "http://localhost:1234/evidencia",
        // }

        try {
            // Usamos el servicio para crear el contrato en la blockchain
            const contractResponse = await ContratoService.crearContrato(formState, web3Context);
            
            // TODO: DEJAR ACA POR SI NECESITAMOS PARA PROBAR
            // const contractResponse = await ContratoService.crearContrato(testState, web3Context);

            if (contractResponse.success) {
                // Ahora que el contrato está creado, generamos el OTP
                const otpResponse = await OTPService.generarOtpContrato({
                    id: contractResponse.contractId, // El contractId del contrato recién creado
                    emailVendedor: formState.emailVendedor,
                    telefonoVendedor: formState.telefonoVendedor
                } as Contrato);
                
                // TODO: VERIFICAR EL CIRCUITO COMPLETO
                // const otpResponse = await OTPService.generarOtpContrato({
                //     id: contractResponse.contractId, // El contractId del contrato recién creado
                //     emailVendedor: testState.emailVendedor,
                //     telefonoVendedor: testState.telefonoVendedor
                // } as Contrato);

                if (otpResponse) {
                    alert("Contrato creado y OTP enviado al vendedor.");
                } else {
                    alert("Hubo un error al generar el OTP.");
                }
            } else {
                alert("Error al crear el contrato.");
            }
        } catch (error) {
            console.error("Error en la creación del contrato o generación de OTP:", error);
            alert("Hubo un error procesando la ceel contrato.");
        }
    };

    return (
        <form className="flex flex-col gap-4 p-4 bg-gray-800 rounded-xl shadow-lg text-gray-100" onSubmit={handleSubmit}>
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 mb-6 border border-gray-700">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                    Nuevo Contrato de Granos
                </h1>
                <p className="text-gray-400 text-lg">Complete los datos del contrato de compraventa</p>
            </div>

            <div className="space-y-6">
                {/* Comprador */}
                <Section icon={User} title="Datos del Comprador" variant="info">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Nombre del Comprador" name="nombreComprador" type="text" onChange={handleInputChanges} required />
                        <InputField label="Nro. Identidad Comprador" name="nroFiscalComprador" type="text" onChange={handleInputChanges} required />
                    </div>
                    <InputField label="Dirección Wallet Comprador" name="billeteraComprador" type="text" onChange={handleInputChanges} required />
                    <InputField label="Dirección de Correo del Comprador" name="emailComprador" type="text" onChange={handleInputChanges} required />
                    <InputField label="Numero de Telefono del Comprador" name="telefonoComprador" type="text" onChange={handleInputChanges} required />
                </Section>

                {/* Vendedor */}
                <Section icon={User} title="Datos del Vendedor" variant="success">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Nombre del Vendedor" name="nombreVendedor" type="text" onChange={handleInputChanges} required />
                        <InputField label="Nro. Identidad Vendedor" name="nroFiscalVendedor" type="text" onChange={handleInputChanges} required />
                    </div>
                    <InputField label="Dirección Wallet Vendedor" name="billeteraVendedor" type="text" onChange={handleInputChanges} required />
                    <InputField label="Dirección de Correo del Vendedor" name="emailVendedor" type="text" onChange={handleInputChanges} required />
                    <InputField label="Numero de Telefono del Vendedor" name="telefonoVendedor" type="text" onChange={handleInputChanges} required />
                </Section>

                {/* Broker (opcional) */}
                <Section icon={Briefcase} title="Datos del Broker (Opcional)" variant="warning">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Nombre del Broker" name="nombreBroker" type="text" onChange={handleInputChanges} />
                        <InputField label="Dirección Wallet Broker" name="billeteraBroker" type="text" onChange={handleInputChanges} />
                    </div>
                    <InputField label="Nro. Identidad Broker" name="nroFiscalBroker" type="text" onChange={handleInputChanges} />
                </Section>

                {/* Condiciones del Grano */}
                <Section icon={Package} title="Condiciones del Grano" variant="default">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Cantidad (Toneladas Métricas)" name="cantidadToneladasMetricas" type="number" onChange={handleInputChanges} required />
                        <InputField label="Cosecha (Año)" name="cosecha" type="text" onChange={handleInputChanges} required />
                    </div>
                </Section>

                {/* Condiciones de Precio */}                
                <Section icon={DollarSign} title="Condiciones del Precio" variant="success">
                    <SelectField
                        label="Tipo de Contrato"
                        name="tipoContrato"
                        options={[
                            { label: "Precio Fijo", value: TipoContrato.PrecioFijo.toString() },
                            { label: "Precio a Fijar", value: TipoContrato.PrecioAFijar.toString() },
                        ]}
                        onChange={handleInputChanges}
                        required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(formState.tipoContrato?.toString() == TipoContrato.PrecioAFijar) &&
                            <>
                                <InputField label="Precio por Tonelada (USD)" name="precioPorToneladaMetrica" type="number" onChange={handleInputChanges} required />
                                <InputField label="Precio CBOT Bushel" name="precioCBOTBushel" type="number" onChange={handleInputChanges} required />
                                <SelectField
                                    label="Ajuste CBOT"
                                    name="ajusteCBOT"
                                    options={[
                                        { label: "Al par (0)", value: 0 },
                                        { label: "Más (+1)", value: 1 },
                                        { label: "Menos (-1)", value: -1 },
                                    ]}
                                    onChange={handleInputChanges}
                                />
                                <InputField label="Fecha Fijacion Precio" name="fechaPrecioChicago" type="date" onChange={handleInputChanges} required />
                            </>
                        }
                    </div>
                    <InputField label="Incoterm" name="incoterm" type="text" onChange={handleInputChanges} required />
                    <InputField label="Precio Final (USD)" name="precioFinal" type="number" onChange={handleInputChanges} required />
                </Section>

                {/* Condiciones de Entrega */}
                <Section icon={Package} title="Condiciones de Entrega" variant="default">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Fecha Inicio de Entrega" name="fechaEntregaInicio" type="date" onChange={handleInputChanges} required />
                        <InputField label="Fecha Fin de Entrega" name="fechaEntregaFin" type="date" onChange={handleInputChanges} required />
                    </div>
                    <InputField label="Empaque" name="empaque" type="text" onChange={handleInputChanges} required />
                </Section>

                {/* Condiciones de Embarque */}
                <Section icon={Truck} title="Condiciones de Embarque" variant="info">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Puerto de Embarque" name="puertoEmbarque" type="text" onChange={handleInputChanges} required />
                        <InputField label="Destino Final" name="destinoFinal" type="text" onChange={handleInputChanges} required />
                    </div>
                </Section>


                {/* Cláusulas Adicionales */}
                <Section icon={FileText} title="Cláusulas Adicionales" variant="warning">
                    {formState.clausulasAdicionales?.map((clausula, index) => (
                        <div key={index} className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-700">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-semibold text-gray-300">Cláusula #{index + 1}</h3>
                                <button
                                    type="button"
                                    onClick={() => removeClausula(index)}
                                    className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors"
                                >
                                    Eliminar
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField
                                    label="Texto de la cláusula"
                                    name={`clausula_${index}`}
                                    type="text"
                                    value={clausula.clausula}
                                    onChange={(e) => handleClausulaChange(index, "clausula", e.target.value)}
                                />
                                <InputField
                                    label="CID IPFS"
                                    name={`cid_${index}`}
                                    type="text"
                                    value={clausula.CID}
                                    onChange={(e) => handleClausulaChange(index, "CID", e.target.value)}
                                    placeholder="Qm..."
                                />
                            </div>
                        </div>
                    ))}
                    <Button type="button" onClick={addClausula} variant="secondary">
                        + Agregar Cláusula
                    </Button>
                </Section>

                {/* Condiciones Adicionales */}
                <Section icon={Truck} title="Datos del Contrato (Internos)" variant="warning">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Hash Versión Contrato" name="hashVersionContrato" type="text" onChange={handleInputChanges} />
                    <InputField label="Evidence URI" name="evidenceURI" type="text" onChange={handleInputChanges} />
                    </div>
                </Section >

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-6 pb-8">
                    <Link to="/">
                        <Button type="button" variant="secondary">
                            Cancelar
                        </Button>
                    </Link>
                    <Button type="button" variant="success" onClick={handleSubmit}>
                        Guardar Contrato
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default FormContratoRegister;
