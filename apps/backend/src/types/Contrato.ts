export enum TipoContrato {
    PrecioFijo = 1,
    PrecioAFijar = 2
};

export enum EstadoContrato {
    Borrador = 1,
    Enviado = 2,
    Firmado = 3,
    Terminado = 4,
    Cancelado = 5
};

interface ClausulaAdicional { 
    textoClausula: string; 
    CID: string 
};

interface Contrato {
    id: number,
    billeteraComprador: string,
    billeteraVendedor: string,
    billeteraBroker: string,
    nombreComprador: string,
    nombreVendedor: string,
    nombreBroker: string,
    nroFiscalComprador: string,
    nroFiscalVendedor: string,
    nroFiscalBroker: string,
    
    // ESTAS PARTES NO ESTAN EN BLOCKCHAIN PERO SI SON NECESARIAS PARA EL BACK
    emailComprador: string;
    telefonoComprador: string;
    emailVendedor: string;
    telefonoVendedor: string;

    // CONDICIONES DEL GRANO
    cantidadToneladas: number,
    tipoGrano: string,
    cosecha: string,

    // CONDICIONES DE ENTREGA
    empaque: string,
    fechaEntregaInicio: Date, //ISO STRING
    fechaEntregaFin: Date, //ISO STRING

    // CONDICIONES DE PRECIO
    tipoContrato: TipoContrato, 
    precioPorToneladaMetrica: number,
    precioCBOTBushel: number,
    ajusteCBOT: number, // al par=0 / más=1 / menos=-1
    fechaPrecioChicago: Date,
    incoterm: string,
    precioFinal: number,

    // CONDICIONES EMBARQUE
    puertoEmbarque: string,
    destinoFinal: string,

    // CONDICIONES CONTRATO
    hashVersionContrato: string,
    evidenceURI: string,
    fechaCelebracionContrato: Date, //ISO STRING
    estado: EstadoContrato,
    clausulasAdicionales: ClausulaAdicional[],
}

export type ContratoOnChain = Omit<Contrato, "emailComprador" | "telefonoComprador" | "emailVendedor" | "telefonoVendedor">;
export type ContratoOffChain = Pick<Contrato, "emailComprador" | "telefonoComprador" | "emailVendedor" | "telefonoVendedor">;