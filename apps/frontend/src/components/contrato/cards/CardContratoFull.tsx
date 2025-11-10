import type { Contrato } from "@types/Contrato";
import React from "react";

export interface ICardContratoProps {
    contrato: Partial<Contrato>;
}

const CardContrato: React.FC<ICardContratoProps> = ({ contrato }) => {
    if (!contrato) return null;

    const formatDate = (date?: string | number) => {
        if (!date) return "-";
        const d = new Date(date);
        return d.toLocaleDateString("es-AR", { year: "numeric", month: "short", day: "numeric" });
    };

    const estadoColor = {
        Borrador: "bg-gray-500",
        Enviado: "bg-yellow-500",
        Firmado: "bg-green-600",
        Terminado: "bg-blue-600",
        Cancelado: "bg-red-600",
    }[ contrato.estado || "Borrador" ];

    return (
        <div className="p-6 rounded-xl bg-gray-800 border border-gray-700 shadow-lg text-gray-100 w-full max-w-2xl">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-green-400">
                    Contrato #{contrato.id ?? "-"}
                </h3>
                <span
                    className={`px-3 py-1 text-sm font-medium rounded-full text-white ${estadoColor}`}
                >
                    {contrato.estado ?? "Desconocido"}
                </span>
            </div>

            {/* PARTES DEL CONTRATO */}
            <section className="mb-4">
                <h4 className="text-lg font-semibold text-gray-300 mb-2">👥 Partes</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><strong>Comprador:</strong> {contrato.nombreComprador}</p>
                    <p><strong>Vendedor:</strong> {contrato.nombreVendedor}</p>
                    {contrato.nombreBroker && (
                        <p><strong>Broker:</strong> {contrato.nombreBroker}</p>
                    )}
                    <p><strong>Billetera Vendedor:</strong> {contrato.billeteraVendedor}</p>
                </div>
            </section>

            {/* CONDICIONES DEL CONTRATO */}
            <section className="mb-4">
                <h4 className="text-lg font-semibold text-gray-300 mb-2">📄 Condiciones</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><strong>Tipo de Contrato:</strong> {contrato.tipoContrato ?? "-"}</p>
                    <p><strong>Tipo de Grano:</strong> {contrato.tipoGrano}</p>
                    <p><strong>Cosecha:</strong> {contrato.cosecha}</p>
                    <p><strong>Cantidad:</strong> {contrato.cantidadToneladas} Tn</p>
                    <p><strong>Empaque:</strong> {contrato.empaque ?? "A granel"}</p>
                    <p><strong>Incoterm:</strong> {contrato.incoterm}</p>
                </div>
            </section>

            {/* ENTREGA */}
            <section className="mb-4">
                <h4 className="text-lg font-semibold text-gray-300 mb-2">🚚 Entrega</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><strong>Período:</strong> {formatDate(contrato.fechaEntregaInicio)} – {formatDate(contrato.fechaEntregaFin)}</p>
                    <p><strong>Puerto de Embarque:</strong> {contrato.puertoEmbarque}</p>
                    <p><strong>Destino Final:</strong> {contrato.destinoFinal}</p>
                </div>
            </section>

            {/* PRECIO */}
            <section className="mb-4">
                <h4 className="text-lg font-semibold text-gray-300 mb-2">💰 Precio</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><strong>Precio por Tonelada:</strong> {contrato.precioPorToneladaMetrica} USD</p>
                    <p><strong>Precio CBOT:</strong> {contrato.precioCBOTBushel} Bushel</p>
                    <p><strong>Ajuste CBOT:</strong> {contrato.ajusteCBOT == -1 ? 'Menos' : contrato.ajusteCBOT == 0 ? 'Al par' : 'Más'}</p>
                    <p><strong>Precio Final:</strong> <span className="text-green-400 font-semibold">{contrato.precioFinal} USD</span></p>
                    <p><strong>Fecha Precio Chicago:</strong> {formatDate(contrato.fechaPrecioChicago)}</p>
                </div>
            </section>

            {/* METADATOS */}
            <section className="border-t border-gray-600 pt-3 text-sm">
                <p><strong>Fecha de celebración:</strong> {formatDate(contrato.fechaCelebracionContrato)}</p>
                {contrato.hashVersionContrato && (
                    <p><strong>Hash versión:</strong> <code>{contrato.hashVersionContrato}</code></p>
                )}
                {contrato.evidenceURI && (
                    <p><strong>Evidencia:</strong>
                        <a href={contrato.evidenceURI} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline ml-1">
                            Ver en IPFS
                        </a>
                    </p>
                )}
            </section>
        </div>
    );
};

export default CardContrato;
