import type { Contrato } from "@types/Contrato";
import React from "react";

interface ICardContratoCompactProps {
    contrato: Partial<Contrato>;
    onSelect?: (contrato: Contrato) => void;
}

const CardContratoCompact: React.FC<ICardContratoCompactProps> = ({ contrato, onSelect }) => {
    if (!contrato) return null;

    const formatDate = (date?: string | number) => {
        if (!date) return "-";
        const d = new Date(date);
        return d.toLocaleDateString("es-AR", { year: "numeric", month: "short", day: "numeric" });
    };

    const estadoColor = {
        Borrador: "bg-gray-600",
        Enviado: "bg-yellow-500",
        Firmado: "bg-green-600",
        Terminado: "bg-blue-600",
        Cancelado: "bg-red-600",
    }[ contrato.estado || "Borrador" ];

    return (
        <div
            onClick={() => onSelect?.(contrato as Contrato)}
            className="flex justify-between items-center px-4 py-3 bg-gray-800 hover:bg-gray-700 cursor-pointer transition-all border border-gray-700 rounded-lg shadow-md text-gray-100 mb-2"
        >
            {/* Izquierda: Identificación */}
            <div className="flex flex-col w-1/3">
                <span className="text-green-400 font-semibold">
                    #{contrato.id ?? "-"} • {contrato.tipoContrato ?? "Desconocido"}
                </span>
                <span className="text-sm text-gray-300">
                    {contrato.nombreComprador} → {contrato.nombreVendedor}
                </span>
            </div>

            {/* Centro: Fechas */}
            <div className="text-sm w-1/3 text-center">
                <p>
                    <strong>Entrega:</strong> {formatDate(contrato.fechaEntregaInicio)} –{" "}
                    {formatDate(contrato.fechaEntregaFin)}
                </p>
                <p className="text-xs text-gray-400">
                    Celebrado: {formatDate(contrato.fechaCelebracionContrato)}
                </p>
            </div>

            {/* Derecha: Precio y estado */}
            <div className="text-right w-1/3">
                <p className="text-lg font-semibold text-green-400">
                    {contrato.precioFinal ? `${contrato.precioFinal} USD` : "-"}
                </p>
                <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white ${estadoColor}`}
                >
                    {contrato.estado ?? "Desconocido"}
                </span>
            </div>
        </div>
    );
};

export default CardContratoCompact;
