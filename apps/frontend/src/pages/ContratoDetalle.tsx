import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardContratoFull from "@components/contrato/cards/CardContratoFull";
import Button from "@components/common/Button";
import { useContractById } from "@hooks/useContractById";
import { EstadoContrato } from "@constants/EstadoContrato";
import { Link } from "lucide-react";
import LoadingComponent from "@components/common/LoadingComponent";
import BaseLayout from "@components/layouts/BaseLayout";
import { mapEstadoContrato } from "@helpers/constantMapHelpers";
import { useWeb3Context } from "@hooks/useWeb3Context";

interface EventoContrato {
    args: any;
    blockNumber: number;
    transactionHash: string;
    event: any;
}

interface EventoFormateado {
    tipo: string;
    descripcion: string;
    fecha: string;
    blockNumber: number;
    txHash: string;
}

export default function ContratoDetalle() {
    const { id } = useParams();
    const { contrato, loading, error } = useContractById(id);
    const { getContractEvents, provider, deployedContract } = useWeb3Context();

    const [ eventos, setEventos ] = useState<EventoFormateado[]>([]);
    const [ loadingEventos, setLoadingEventos ] = useState(false);

    // Función para obtener nombres desde el contrato
    const obtenerNombresContrato = async (idContrato: string) => {
        try {
            if (!deployedContract) return null;

            const todosContratos = await deployedContract.obtenerContratos();
            const indice = Number(idContrato) - 1;

            if (indice >= 0 && indice < todosContratos.length) {
                const contratoData = todosContratos[ indice ];
                return {
                    nombreComprador: contratoData.partes.nombreComprador || "",
                    nombreVendedor: contratoData.partes.nombreVendedor || "",
                    nombreBroker: contratoData.partes.nombreBroker || ""
                };
            }

            return null;
        } catch (err) {
            console.error("Error obteniendo nombres del contrato:", err);
            return null;
        }
    };

    // Función para acortar address
    const acortarAddress = (address: string) => {
        if (!address) return 'desconocido';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    // Función para formatear eventos según su tipo
    const formatearEvento = async (evento: EventoContrato): Promise<EventoFormateado> => {
        let descripcion = "";
        const tipo = evento.eventName; // ✅ Ahora siempre existe

        try {
            // Obtener timestamp del bloque
            const block = await provider?.getBlock(evento.blockNumber);
            const fecha = block?.timestamp
                ? new Date(block.timestamp * 1000).toLocaleString('es-PY', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
                : 'Fecha desconocida';

            // Obtener nombres reales del contrato
            const idContrato = evento.args?.idContrato?.toString();
            const nombres = idContrato ? await obtenerNombresContrato(idContrato) : null;

            // Formatear según tipo de evento
            switch (tipo) {
                case "ContratoCreado":
                    const comprador = (nombres?.nombreComprador && nombres.nombreComprador.trim() !== "")
                        ? nombres.nombreComprador
                        : acortarAddress(evento.args?.comprador);
                    const vendedor = (nombres?.nombreVendedor && nombres.nombreVendedor.trim() !== "")
                        ? nombres.nombreVendedor
                        : acortarAddress(evento.args?.vendedor);
                    descripcion = `Contrato creado por ${comprador} (Comprador) con ${vendedor} (Vendedor)`;
                    break;

                case "ContratoFirmado":
                    const firmante = nombres?.nombreVendedor || acortarAddress(evento.args?.vendedor);
                    descripcion = `Contrato firmado por ${firmante} (Vendedor)`;
                    break;

                case "ContratoEditado":
                    const editor = nombres?.nombreComprador || acortarAddress(evento.args?.comprador);
                    descripcion = `Contrato editado por ${editor} (Comprador)`;
                    break;

                case "ContratoCancelado":
                    const motivo = evento.args?.motivo || 'No especificado';
                    const ejecutor = acortarAddress(evento.args?.ejecutor);
                    descripcion = `Contrato cancelado por ${ejecutor}. Motivo: ${motivo}`;
                    break;

                case "EntregaConfirmada":
                    const entregador = nombres?.nombreVendedor || acortarAddress(evento.args?.vendedor);
                    descripcion = `Entrega confirmada por ${entregador} (Vendedor)`;
                    break;

                case "ContratoCerrado":
                    const estadoMap: { [ key: number ]: string } = {
                        0: "Borrador",
                        1: "Enviado",
                        2: "Firmado",
                        3: "Terminado",
                        4: "Cancelado"
                    };
                    const nuevoEstado = estadoMap[ Number(evento.args?.nuevoEstado) ] || 'Desconocido';
                    descripcion = `Contrato cerrado con estado: ${nuevoEstado}`;
                    break;

                case "PrecioFijado":
                    const precio = evento.args?.precioFinal
                        ? `${(Number(evento.args.precioFinal) / 1e18).toFixed(2)} USD/TM`
                        : '0 USD/TM';
                    // descripcion = `Precio final fijado en ${precio}`;
                    descripcion = `Precio final fijado `;
                    break;

                case "ContratoCelebrado":
                    descripcion = `Contrato celebrado oficialmente`;
                    break;

                default:
                    descripcion = `Evento: ${tipo}`;
            }

            return {
                tipo,
                descripcion,
                fecha,
                blockNumber: evento.blockNumber,
                txHash: evento.transactionHash
            };
        } catch (err) {
            console.error("Error formateando evento:", err);
            return {
                tipo,
                descripcion: "Error al cargar detalles",
                fecha: "Desconocida",
                blockNumber: evento.blockNumber,
                txHash: evento.transactionHash
            };
        }
    };

    // Cargar eventos cuando el contrato esté disponible
    useEffect(() => {
        const cargarEventos = async () => {
            if (!contrato || !getContractEvents) return;

            setLoadingEventos(true);
            try {
                const tiposEventos = [
                    "ContratoCreado",
                    "ContratoFirmado",
                    "ContratoEditado",
                    "ContratoCancelado",
                    "EntregaConfirmada",
                    "ContratoCerrado",
                    "PrecioFijado",
                    "ContratoCelebrado"
                ];

                const promesasEventos = tiposEventos.map(tipo =>
                    getContractEvents(tipo, { fromBlock: 0 })
                        .catch(err => {
                            console.warn(`No se pudieron obtener eventos ${tipo}:`, err);
                            return [];
                        })
                );

                const resultados = await Promise.all(promesasEventos);
                const todosEventos = resultados.flat();

                // Filtrar eventos relacionados con este contrato
                const eventosFiltrados = todosEventos.filter(
                    evento => evento.args?.idContrato?.toString() === id
                );

                // Formatear eventos
                const eventosFormateados = await Promise.all(
                    eventosFiltrados.map(formatearEvento)
                );

                // Ordenar por bloque (más reciente primero)
                eventosFormateados.sort((a, b) => b.blockNumber - a.blockNumber);

                setEventos(eventosFormateados);
            } catch (err) {
                console.error("Error cargando eventos:", err);
            } finally {
                setLoadingEventos(false);
            }
        };

        cargarEventos();
    }, [ contrato, id, getContractEvents, deployedContract ]);

    // Función para determinar color según tipo de evento
    const getColorEvento = (tipo: string) => {
        switch (tipo) {
            case "ContratoCreado": return "border-green-500";
            case "ContratoFirmado": return "border-blue-500";
            case "ContratoCancelado": return "border-red-500";
            case "EntregaConfirmada": return "border-purple-500";
            case "PrecioFijado": return "border-yellow-500";
            case "ContratoCelebrado": return "border-cyan-500";
            case "ContratoEditado": return "border-orange-500";
            default: return "border-gray-500";
        }
    };

    if (loading)
        return <LoadingComponent message={`Cargando Contrato ${id}`} />;

    if (!contrato && !loading && !error) {
        return (
            <div className="text-center mt-10 text-red-400">
                <p>Contrato no encontrado</p>
            </div>
        );
    }

    return (
        <BaseLayout>
            <div className="p-6 max-w-4xl mx-auto">
                {contrato && (
                    <CardContratoFull contrato={contrato} />
                )}

                {contrato && (mapEstadoContrato(Number(contrato.estado)) === "Borrador" || mapEstadoContrato(Number(contrato.estado)) === "Enviado") && (
                    <div className="mt-8 text-center">
                        <p className="text-yellow-400 mb-4">Este contrato requiere su firma. ¿Desea proceder?</p>
                        <Link to={`/firmar/${contrato.id}`}>
                            <Button variant="success" className="px-8 py-3 text-lg">
                                Firmar Contrato Ahora
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Historial de Eventos */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4 text-white">
                        📜 Historial de Eventos
                    </h2>

                    {loadingEventos ? (
                        <LoadingComponent message="Cargando historial..." />
                    ) : eventos.length === 0 ? (
                        <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
                            No hay eventos registrados para este contrato
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {eventos.map((evento, index) => (
                                <div
                                    key={index}
                                    className={`bg-gray-800 rounded-lg p-5 border-l-4 ${getColorEvento(evento.tipo)} hover:bg-gray-750 transition-colors`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold text-blue-400">
                                            {evento.tipo}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            Bloque #{evento.blockNumber}
                                        </span>
                                    </div>

                                    <p className="text-white mb-2">
                                        {evento.descripcion}
                                    </p>

                                    <div className="flex justify-between items-center text-sm text-gray-400">
                                        <span>{evento.fecha}</span>
                                        <a
                                            href={`https://etherscan.io/tx/${evento.txHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 underline"
                                        >
                                            Ver transacción ↗
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </BaseLayout>
    );
}