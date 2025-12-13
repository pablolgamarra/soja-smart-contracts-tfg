import React from 'react';
import { SquareArrowOutUpRight, CalendarSync } from "lucide-react";
import CardContratoCompact from "@components/contrato/cards/CardContratoCompact"; // Asegúrate de que la ruta sea correcta
import type { Contrato } from '@types/Contrato';
import { useNavigate } from 'react-router-dom';

interface ContratoListItemProps {
    contrato: Contrato;
    index: number;
    isSelected: boolean;
    onSelect: (contrato: Contrato) => void;
    onNavigate: (id: string) => void;
    onResendOTP: (id: string) => void;
}

const ContratoListItem: React.FC<ContratoListItemProps> = React.memo(({
    contrato,
    index,
    isSelected,
    onSelect,
    onNavigate,
    onResendOTP
}) => {
    console.log(contrato)
    const estadoLabel = contrato.estado?.toString();
    const navigate = useNavigate();

    const getEstadoClasses = (estado: string | undefined) => {
        switch (estado) {
            case "Enviado":
                return "bg-yellow-500 text-gray-900";
            case "Firmado":
                return "bg-green-600 text-white";
            default:
                return "bg-gray-600 text-gray-200";
        }
    };

    return (
        <div key={contrato.id || index}>
            <li
                className={`list-none p-4 border rounded-lg transition-all shadow-md cursor-pointer
                    bg-gray-800 border-gray-700
                    hover:bg-gray-700 hover:shadow-xl hover:-translate-y-1
                    ${isSelected ? "ring-2 ring-green-400 shadow-xl !bg-gray-700 !-translate-y-0" : ""}`
                }
                onClick={() => onSelect(contrato)}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <strong className="text-green-400">Contrato #{index + 1}</strong>
                        <p className="text-sm text-gray-300 mt-1">
                            <strong>Vendedor:</strong> {contrato.nombreVendedor}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span
                            className={`text-xs px-3 py-1 rounded-full font-semibold ${getEstadoClasses(estadoLabel)}`}
                        >
                            {estadoLabel}
                        </span>

                        {/* Botón Resend OTP */}
                        <button
                            onClick={(e) => { e.stopPropagation(); onResendOTP(contrato.id.toString()); }}
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                            title="Volver a enviar codigo OTP"
                        >
                            <CalendarSync size={20} />
                        </button>

                        {/* Botón Ver Detalles */}
                        <button
                            // onClick={(e) => { e.stopPropagation(); onNavigate(contrato.id.toString()); }}
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                            title="Ver detalles completos"
                        >
                            <SquareArrowOutUpRight onClick={() => { navigate(`/contrato/${index + 1}`)}}/>
                        </button>
                    </div>
                </div>
            </li>

            {/* DETALLES DEL CONTRATO (Dropdown) */}
            {isSelected && (
                <div className="mt-0 p-6 bg-gray-700 border border-t-0 border-green-400 rounded-b-xl shadow-inner animate-in fade-in slide-in-from-top-1">
                    <h2 className="text-2xl font-bold text-green-300 mb-4">Detalles del Contrato Seleccionado</h2>
                    <CardContratoCompact contrato={contrato} />
                    <p className="text-gray-400 text-sm mt-3">Haga clic en el elemento de la lista para cerrarlo.</p>
                </div>
            )}
        </div>
    );
});

export default ContratoListItem;