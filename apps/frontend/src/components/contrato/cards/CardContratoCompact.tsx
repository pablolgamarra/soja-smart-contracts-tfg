import type { Contrato } from "@types/Contrato";
import { SquareArrowOutUpRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ICardContratoCompactProps {
    contrato: Partial<Contrato>;
    onSelect?: (contrato: Contrato) => void;
}

const CardContratoCompact: React.FC<ICardContratoCompactProps> = ({ contrato, onSelect }) => {
    if (!contrato) return null;

    const navigate = useNavigate();

    // TODO: mover a helper
    const formatDate = (date?: string | number) => {
        if (!date) return "-";
        const d = new Date(date);
        return d.toLocaleDateString("es-PY", { year: "numeric", month: "short", day: "numeric" });
    };

    const estadoStyle = {
        Borrador: "bg-gray-600 text-gray-100",
        Enviado: "bg-yellow-500 text-gray-900",
        Firmado: "bg-green-600 text-white",
        Terminado: "bg-blue-600 text-white",
        Cancelado: "bg-red-600 text-white",
    }[ contrato.estado || "Borrador" ];

    return (
        <div
            onClick={() => onSelect?.(contrato as Contrato)}
            className="flex justify-between items-center px-5 py-4
                       bg-gray-800 border border-gray-700 rounded-xl shadow-lg
                       hover:bg-gray-700 hover:shadow-xl transition-all cursor-pointer
                       transform hover:-translate-y-1"
        >
            {/* Identificación */}
            <div className="flex flex-col w-1/3">
                <span className="text-green-400 font-bold text-lg">
                    #{contrato.id ?? "-"} • {contrato.tipoContrato ?? "Contrato"}
                </span>
                <span className="text-sm text-gray-300 mt-1">
                    {contrato.nombreComprador} → {contrato.nombreVendedor}
                </span>
            </div>

            {/* Fechas */}
            <div className="text-sm w-1/3 text-center">
                <p className="font-medium text-gray-200">
                    <span className="text-gray-400">Entrega:</span>
                    {" "}
                    {formatDate(contrato.fechaEntregaInicio)} – {formatDate(contrato.fechaEntregaFin)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Celebrado: {formatDate(contrato.fechaCelebracionContrato)}
                </p>
            </div>

            {/* Precio + Estado */}
            <div className="flex row text-right w-1/3">
                <p className="text-xl font-extrabold text-green-400">
                    {contrato.precioFinal ? `${contrato.precioFinal} USD` : "-"}
                </p>

                <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${estadoStyle}`}
                >
                    {contrato.estado}
                </span>

                <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold`}
                >
                    <SquareArrowOutUpRight onClick={()=>{navigate(`/contrato/${contrato.id}`)}}/>
                </span>
            </div>
        </div>
    );
};

export default CardContratoCompact;
