import { useState } from "react";
import type { TipoContrato } from "@constants/TipoContrato";
import type { EstadoContrato } from "@constants/EstadoContrato";
import { InputField } from "@components/common/InputField";
import Button from "@components/common/Button";
import { Link } from "react-router-dom";

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
    evidenceURI:string;
    fechaCelebracionContrato:number;
    estado: EstadoContrato;
    clausulasAdicionales: Array<{clausula: string, CID: string}>
}

export interface IFormContratoRegisterProps{
    initialStateValues?: IFormContratoRegisterState;
}

const FormContratoRegister:React.FC<IFormContratoRegisterProps> = ({initialStateValues}) => {
    const initialValues: IFormContratoRegisterState = initialStateValues ? initialStateValues : {} as IFormContratoRegisterState;

    const [ formState, setFormState ] = useState<IFormContratoRegisterState>(initialValues);

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.getAttribute('name')) {
            return;
        }

        const name = e.target.getAttribute('name')!;
        setFormState({ ...formState, [ name ]: e.target.value });
    };

    return (
        <>
            <Button>
                <Link to={"/home"}>Volver Atrás</Link>
            </Button>
            <form>
                <InputField
                    key={""}
                    label={"Billetera Comprador"}
                    name={"billeteraComprador"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Billetera Vendedor"}
                    name={"billeteraVendedor"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Billetera Broker"}
                    name={"billeteraBroker"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Nombre del Comprador"}
                    name={"nombreComprador"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Nombre del Vendedor"}
                    name={"nombreVendedor"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Nombre del Broker"}
                    name={"nombreBroker"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"CI / Ruc del Comprador"}
                    name={"nroFiscalComprador"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"CI / Ruc del Vendedor"}
                    name={"nroFiscalVendedor"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"CI / Ruc del Broker"}
                    name={"nroFiscalBroker"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Email del Comprador"}
                    name={"emailComprador"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Email del Vendedor"}
                    name={"emailVendedor"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Teléfono del Comprador"}
                    name={"telefonoComprador"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Teléfono del Vendedor"}
                    name={"telefonoVendedor"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Cantidad de Toneladas"}
                    name={"cantidadToneladas"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Cosecha"}
                    name={"cosecha"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Empaque"}
                    name={"empaque"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Entrega Desde"}
                    name={"fechaEntregaInicio"}
                    type={"date"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Entrega Hasta"}
                    name={"fechaEntregaFin"}
                    type={"date"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Tipo de Contrato"}
                    name={"tipoContrato"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Precio por Tonelada"}
                    name={"precioPorToneladaMetrica"}
                    type={"date"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Precio Bushel"}
                    name={"precioCBOTBushel"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Ajuste CBOT"}
                    name={"ajusteCBOT"}
                    type={"number"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Fecha de Fijacion de Precio"}
                    name={"fechaPrecioChicago"}
                    type={"date"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Incoterm"}
                    name={"incoterm"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Precio Final"}
                    name={"precioFinal"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Puerto de Embarque"}
                    name={"puertoEmbarque"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    key={""}
                    label={"Destino Final"}
                    name={"destinoFinal"}
                    type={"text"}
                    onChange={handleInputChanges}
                    required
                />
            </form>
        </>
    )
};

export default FormContratoRegister;
