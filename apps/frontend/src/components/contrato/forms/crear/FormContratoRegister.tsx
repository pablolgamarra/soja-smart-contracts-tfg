import React from "react";
import { useContratoRegister } from "@hooks/forms/contratos/useContratoRegister"; // 👈 Usar el hook
import { InputField } from "@components/common/InputField";
import SelectField from "@components/common/SelectField";
import Button from "@components/common/Button";
import Section from "@components/common/Section";
import { Briefcase, DollarSign, FileText, Package, Truck, User } from "lucide-react";
import { Link } from "react-router-dom";
import { TipoContrato } from "@constants/TipoContrato";
import SectionHeader from "@components/common/SectionHeader";
import type { EstadoContrato } from "@constants/EstadoContrato";

// Exportar la interfaz de estado desde aquí o desde un archivo de tipos
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
    // Obtener toda la lógica del hook
    const {
        formState,
        isSubmitting,
        handleInputChanges,
        handleClausulaChange,
        addClausula,
        removeClausula,
        handleSubmit,
        web3Context,
    } = useContratoRegister();

    // Convertir el tipo de contrato para la renderización condicional
    const isPrecioAFijar = formState.tipoContrato?.toString() == TipoContrato.PrecioAFijar.toString();


    return (
        // El onClick en el botón debe ser type="submit" para que el form lo capture.
        // O si ya tiene type="button" el form debe llamar el handler en el onSubmit.
        <form
            className="flex flex-col gap-4 p-4 bg-gray-800 rounded-xl shadow-lg text-gray-100 min-w-8/12 mt-12"
            onSubmit={handleSubmit}
        >
            <SectionHeader title="Nuevo contrato de granos" description="Complete con los datos necesarios" />

            <div className="space-y-6">
                {/* Comprador */}
                <Section icon={User} title="Datos del Comprador" variant="info">
                    {/* ... Inputs del comprador (usando formState y handleInputChanges) ... */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Nombre del Comprador" name="nombreComprador" type="text" onChange={handleInputChanges} required value={formState.nombreComprador || ''} />
                        <InputField label="Nro. Identidad Comprador" name="nroFiscalComprador" type="text" onChange={handleInputChanges} required value={formState.nroFiscalComprador || ''} />
                    </div>
                    <InputField label="Dirección Wallet Comprador" name="billeteraComprador" type="text" onChange={handleInputChanges} required value={formState.billeteraComprador || ''} />
                    <InputField label="Dirección de Correo del Comprador" name="emailComprador" type="email" onChange={handleInputChanges} required value={formState.emailComprador || ''} /> {/* Tipo email */}
                    <InputField label="Numero de Telefono del Comprador" name="telefonoComprador" type="tel" onChange={handleInputChanges} required value={formState.telefonoComprador || ''} /> {/* Tipo tel */}
                </Section>

                {/* Vendedor */}
                <Section icon={User} title="Datos del Vendedor" variant="success">
                    {/* ... Inputs del vendedor ... */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Nombre del Vendedor" name="nombreVendedor" type="text" onChange={handleInputChanges} required value={formState.nombreVendedor || ''} />
                        <InputField label="Nro. Identidad Vendedor" name="nroFiscalVendedor" type="text" onChange={handleInputChanges} required value={formState.nroFiscalVendedor || ''} />
                    </div>
                    <InputField label="Dirección Wallet Vendedor" name="billeteraVendedor" type="text" onChange={handleInputChanges} required value={formState.billeteraVendedor || ''} />
                    <InputField label="Dirección de Correo del Vendedor" name="emailVendedor" type="email" onChange={handleInputChanges} required value={formState.emailVendedor || ''} />
                    <InputField label="Numero de Telefono del Vendedor" name="telefonoVendedor" type="tel" onChange={handleInputChanges} required value={formState.telefonoVendedor || ''} />
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
                        value={formState.tipoContrato?.toString()} // Asegurarse de que el valor sea el string del enum
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Renderizado condicional basado en isPrecioAFijar */}
                        {isPrecioAFijar && (
                            <>
                                <InputField label="Precio por Tonelada (USD)" name="precioPorToneladaMetrica" type="number" onChange={handleInputChanges} required value={formState.precioPorToneladaMetrica || ''} />
                                <InputField label="Precio CBOT Bushel" name="precioCBOTBushel" type="number" onChange={handleInputChanges} required value={formState.precioCBOTBushel || ''} />
                                <SelectField
                                    label="Ajuste CBOT"
                                    name="ajusteCBOT"
                                    options={[
                                        { label: "Al par (0)", value: "0" }, // Asegurarse de que los valores sean strings si vienen de event.target.value
                                        { label: "Más (+1)", value: "1" },
                                        { label: "Menos (-1)", value: "-1" },
                                    ]}
                                    onChange={handleInputChanges}
                                    value={formState.ajusteCBOT?.toString()}
                                />
                                <InputField label="Fecha Fijacion Precio" name="fechaPrecioChicago" type="date" onChange={handleInputChanges} required value={formState.fechaPrecioChicago || ''} />
                            </>
                        )}
                    </div>
                    <InputField label="Incoterm" name="incoterm" type="text" onChange={handleInputChanges} required value={formState.incoterm || ''} />
                    <InputField label="Precio Final (USD)" name="precioFinal" type="number" onChange={handleInputChanges} required value={formState.precioFinal || ''} />
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
                    {/* Asegurarse de que formState.clausulasAdicionales esté inicializado */}
                    {(formState.clausulasAdicionales || []).map((clausula, index) => (
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
                    <Button type="button" onClick={addClausula} variant="secondary" disabled={isSubmitting}>
                        + Agregar Cláusula
                    </Button>
                </Section>


                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-6 pb-8">
                    <Link to="/">
                        <Button type="button" variant="secondary">
                            Cancelar
                        </Button>
                    </Link>
                    <Button
                        type="submit" // 👈 Cambiar a type="submit" para que active el onSubmit del form
                        variant="success"
                        disabled={isSubmitting || !web3Context.isConnected}
                    >
                        {isSubmitting ? 'Creando Contrato...' : 'Guardar Contrato'}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default FormContratoRegister;