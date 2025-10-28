import { useEffect, useState } from "react";
import { useContrato } from "../hooks/useContrato";


export default function ListarContratos(props: {userAddress: string}) {
    const {userAddress} = props;

    const [ contratos, setContratos ] = useState<any[]>([]);
    const [ loading, setLoading ] = useState(false);

    const {contrato} = useContrato();

    useEffect(() => {
        if (userAddress) {
            const obtenerContratos = async () => {
                setLoading(true);
                try {
                    if (!contrato || contrato == null) {
                        alert("Contrato no encontrado");
                        throw new Error("Contrato no encontrado");
                    }
                    // Obtener todos los contratos
                    const contratosData = await contrato.obtenerContratos();

                    // Filtrar contratos creados por el comprador (userAddress)
                    const contratosFiltrados = contratosData.filter((contrato: any) => contrato.identificadorPartes.comprador === userAddress);
                    setContratos(contratosFiltrados);
                } catch (err: any) {
                    console.error(err);
                    alert("❌ Error al obtener contratos");
                } finally {
                    setLoading(false);
                }
            };

            obtenerContratos();
        }
    }, [ contrato, userAddress ]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Lista de Contratos</h2>
            {loading ? (
                <p>Cargando contratos...</p>
            ) : (
                <div>
                    {contratos.length === 0 ? (
                        <p>No has creado contratos aún.</p>
                    ) : (
                        <ul>
                            {contratos.map((contrato: any, index: number) => (
                                <li key={index} className="mb-4 p-3 border rounded-md">
                                    <div>
                                        <strong>Contrato #{index + 1}</strong>
                                    </div>
                                    <div>
                                        <strong>Vendedor:</strong> {contrato.identificadorPartes.vendedor}
                                    </div>
                                    <div>
                                        <strong>Estado:</strong> {contrato.estado === 1 ? "Offered" : contrato.estado === 2 ? "Accepted" : "Other"}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
