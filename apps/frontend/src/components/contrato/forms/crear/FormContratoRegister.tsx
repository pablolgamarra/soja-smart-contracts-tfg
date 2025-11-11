import { useState } from "react";
import { useWeb3Context } from "@hooks/useWeb3Context";
import { ContratoService } from "@services/ContratoService"; // Importa el servicio ContratoService
import OTPService from "@services/OTPService"; // Importa OTPService
import { InputField } from "@components/common/InputField"; // Componente de InputField

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
    const { signer, deployedContract, isConnected, connectWallet } = useWeb3Context();

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const name = e.target.name;
        setFormState({ ...formState, [name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isConnected) {
            alert("Por favor, conecte su wallet antes de continuar.");
            return;
        }

        if (!deployedContract || !signer) {
            alert("Contrato o signer no inicializado.");
            return;
        }

        try {
            const contratoData = {
                billeteraComprador: await signer.getAddress(),
                billeteraVendedor: formState.billeteraVendedor,
                nombreComprador: formState.nombreComprador,
                nombreVendedor: formState.nombreVendedor,
                cantidadToneladas: formState.cantidadToneladas,
                tipoGrano: formState.tipoGrano,
                cosecha: formState.cosecha,
                precioFinal: formState.precioFinal,
                // Otros campos según lo necesites
            };

            // Usamos el servicio para crear el contrato en la blockchain
            const contractResponse = await ContratoService.crearContrato(contratoData, {
                deployedContract,
                signer,
                isConnected
            });

            if (contractResponse) {
                // Ahora que el contrato está creado, generamos el OTP
                const otpResponse = await OTPService.generarOtpContrato({
                    id: contractResponse.contractId, // El contractId del contrato recién creado
                    emailVendedor: formState.emailVendedor,
                });

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
            alert("Hubo un error procesando el contrato.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Contrato</h2>
            <InputField
                label={"Nombre del Comprador"}
                name={"nombreComprador"}
                type={"text"}
                onChange={handleInputChanges}
                required
            />
            <InputField
                label={"Billetera del Comprador"}
                name={"billeteraComprador"}
                type={"text"}
                onChange={handleInputChanges}
                required
            />
            <InputField
                label={"Nombre del Vendedor"}
                name={"nombreVendedor"}
                type={"text"}
                onChange={handleInputChanges}
                required
            />
            <InputField
                label={"Billetera del Vendedor"}
                name={"billeteraVendedor"}
                type={"text"}
                onChange={handleInputChanges}
                required
            />
            <InputField
                label={"Cantidad de Toneladas"}
                name={"cantidadToneladas"}
                type={"number"}
                onChange={handleInputChanges}
                required
            />
            <InputField
                label={"Tipo de Grano"}
                name={"tipoGrano"}
                type={"text"}
                onChange={handleInputChanges}
                required
            />
            <InputField
                label={"Cosecha"}
                name={"cosecha"}
                type={"text"}
                onChange={handleInputChanges}
                required
            />
            <InputField
                label={"Precio Final"}
                name={"precioFinal"}
                type={"number"}
                onChange={handleInputChanges}
                required
            />
            <button type="submit" className="submit-button">Crear Contrato</button>
        </form>
    );
};

export default FormContratoRegister;
