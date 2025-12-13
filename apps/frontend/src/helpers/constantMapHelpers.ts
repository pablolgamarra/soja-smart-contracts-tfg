import {EstadoContrato} from "@constants/EstadoContrato";
import {TipoContrato} from "@constants/TipoContrato";
function mapEstadoContrato(value: number): EstadoContrato {
    switch (value) {
        case 0: return EstadoContrato.Borrador;
        case 1: return EstadoContrato.Enviado;
        case 2: return EstadoContrato.Firmado;
        case 3: return EstadoContrato.Terminado;
        case 4: return EstadoContrato.Cancelado;
        default:
            throw new Error(`EstadoContrato inválido: ${value}`);
    }
}

function mapTipoContrato(value: number): TipoContrato {
    switch (value) {
        case 0: return TipoContrato.PrecioFijo;
        case 1: return TipoContrato.PrecioAFijar;
        default:
            throw new Error(`TipoContrato inválido: ${value}`);
    }
}

export {
    mapEstadoContrato,
    mapTipoContrato
};