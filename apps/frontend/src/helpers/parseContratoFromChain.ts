import { mapEstadoContrato, mapTipoContrato } from "@helpers/constantMapHelpers";
import { convertBigIntToString } from "@helpers/convertBigIntToString";
import { parseUnixSecondsToDate } from "@helpers/dateParsers";
import type { Contrato } from "@types/Contrato";

export default function parseContratoFromChain(c: any):Contrato {
    return {
        id: c.id,
        emailComprador: "",
        emailVendedor: "",
        telefonoComprador: "",
        telefonoVendedor: "",
        nombreComprador: c.partes.nombreComprador,
        billeteraComprador: c.partes.comprador.toString(),
        nroFiscalComprador: c.partes.nroIdentidadComprador,

        nombreVendedor: c.partes.nombreVendedor,
        billeteraVendedor: c.partes.vendedor.toString(),
        nroFiscalVendedor: c.partes.nroIdentidadVendedor,

        nombreBroker: c.partes.nombreBroker,
        nroFiscalBroker: c.partes.nroIdentidadBroker,
        billeteraBroker: c.partes.broker.toString(),

        // CONDICIONES DEL GRANO
        cantidadToneladas: Number(convertBigIntToString(c.condicionesGrano.cantidadToneladasMetricas)),
        tipoGrano: c.condicionesGrano.tipoGrano,
        cosecha: c.condicionesGrano.cosecha,

        // CONDICIONES DE ENTREGA
        empaque: c.condicionesEntrega.empaque,
        fechaEntregaInicio: parseUnixSecondsToDate(c.condicionesEntrega.fechaEntregaInicio),
        fechaEntregaFin: parseUnixSecondsToDate(c.condicionesEntrega.fechaEntregaFin),

        // CONDICIONES DE PRECIO
        // tipoContrato: Number(convertBigIntToString(c.condicionesPrecio.tipoContrato)) as TipoContrato,
        precioPorToneladaMetrica: Number(convertBigIntToString(c.condicionesPrecio.precioPorToneladaMetrica)),
        precioCBOTBushel: Number(convertBigIntToString(c.condicionesPrecio.precioCBOTBushel)),
        ajusteCBOT: Number(convertBigIntToString(c.condicionesPrecio.ajusteCBOT)), // al par=0 / más=1 / menos=-1
        // fechaPrecioChicago: parseUnixSecondsToDate(c.condicionesPrecio.fechaPrecioChicago),
        incoterm: c.condicionesPrecio.incoterm,
        precioFinal: Number(convertBigIntToString(c.condicionesPrecio.precioFinal)),

        // CONDICIONES EMBARQUE
        puertoEmbarque: c.condicionesEmbarque.puertoEmbarque,
        destinoFinal: c.condicionesEmbarque.destinoFinal,

        hashVersionContrato: c.hashVersionContrato,
        evidenceURI: c.evidenceURI,

        fechaCelebracionContrato: parseUnixSecondsToDate(c.fechaCelebracionContrato),

        // estado: Number(c.estado) as EstadoContrato,

        clausulasAdicionales: [],
        // nombreComprador: c.partes.nombreComprador,
        // billeteraComprador: c.partes.comprador.toString(),
        // nroFiscalComprador: c.partes.nroIdentidadComprador,

        // nombreVendedor: c.partes.nombreVendedor,
        // billeteraVendedor: c.partes.vendedor.toString(),
        // nroFiscalVendedor: c.partes.nroIdentidadVendedor,

        // nombreBroker: c.partes.nombreBroker,
        // nroFiscalBroker: c.partes.nroIdentidadBroker,
        // billeteraBroker: c.partes.broker.toString(),

        // // CONDICIONES DEL GRANO
        // cantidadToneladas: Number(convertBigIntToString(c.condicionesGrano.cantidadToneladasMetricas)),
        // tipoGrano: c.condicionesGrano.tipoGrano,
        // cosecha: c.condicionesGrano.cosecha,

        // CONDICIONES DE ENTREGA
        // empaque: c.condicionesEntrega.empaque,

        // CONDICIONES DE PRECIO
        // incoterm: c.condicionesPrecio.incoterm,

        // // CONDICIONES EMBARQUE
        // puertoEmbarque: c.condicionesEmbarque.puertoEmbarque,
        // destinoFinal: c.condicionesEmbarque.destinoFinal,

        // hashVersionContrato: c.hashVersionContrato,
        // evidenceURI: c.evidenceURI,


        // clausulasAdicionales: [],
        

        // fechaEntregaInicio: (Number(c.condicionesEntrega.fechaEntregaInicio) * 1000).toString(),
        // fechaEntregaFin: (Number(c.condicionesEntrega.fechaEntregaFin) * 1000).toString(),

        tipoContrato: mapTipoContrato(
            Number(c.condicionesPrecio.tipoContrato)
        ),
        // precioPorToneladaMetrica: Number(convertBigIntToString(c.condicionesPrecio.precioPorToneladaMetrica)),
        // precioCBOTBushel: Number(convertBigIntToString(c.condicionesPrecio.precioCBOTBushel)),
        // ajusteCBOT: Number(c.condicionesPrecio.ajusteCBOT),
        // fechaPrecioChicago: (Number(c.condicionesPrecio.fechaPrecioChicago) * 1000).toString(),
        // precioFinal: Number(convertBigIntToString(c.condicionesPrecio.precioFinal)),

        // fechaCelebracionContrato: Number(convertBigIntToString(c.fechaCelebracionContrato) * 1000),
        estado: mapEstadoContrato(
            Number(c.estado)
        ),
    };
}
