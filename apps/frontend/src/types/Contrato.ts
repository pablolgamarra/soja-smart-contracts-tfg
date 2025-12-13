import { EstadoContrato } from "@constants/EstadoContrato";
import { TipoContrato } from "@constants/TipoContrato";

export interface Contrato {
    // IDENTIFICADORES
    id: number;
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
    fechaEntregaInicio: Date;
    fechaEntregaFin: Date;

    // CONDICIONES DE PRECIO
    tipoContrato: TipoContrato;
    precioPorToneladaMetrica: number;
    precioCBOTBushel: number;
    ajusteCBOT: number; // al par=0 / más=1 / menos=-1
    fechaPrecioChicago: Date;
    incoterm: string;
    precioFinal: number;

    // CONDICIONES EMBARQUE
    puertoEmbarque: string;
    destinoFinal: string;

    // CONDICIONES CONTRATO
    hashVersionContrato: string;
    evidenceURI:string;
    fechaCelebracionContrato: Date;
    estado: EstadoContrato;
    clausulasAdicionales: Array<{clausula: string, CID: string}>
}