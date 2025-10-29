import { useEffect, useState } from "react";
import { useWeb3Context } from "../hooks/useWeb3Context";


export default function Listarcontracts() {
    const [ contracts, setcontracts ] = useState<any[]>([]);
    const [ loading, setLoading ] = useState(false);

    const {contract, userAddress} = useWeb3Context();

    useEffect(() => {
        if (userAddress) {
            const obtenercontracts = async () => {
                setLoading(true);
                try {
                    if (!contract || contract == null) {
                        alert("contract no encontrado");
                        throw new Error("contract no encontrado");
                    }
                    // Obtener todos los contracts
                    const contractsData = await contract.obtenercontracts();

                    // Filtrar contracts creados por el comprador (userAddress)
                    const contractsFiltrados = contractsData.filter((contract: any) => contract.identificadorPartes.comprador === userAddress);
                    setcontracts(contractsFiltrados);
                } catch (err: any) {
                    console.error(err);
                    alert("❌ Error al obtener contracts");
                } finally {
                    setLoading(false);
                }
            };

            obtenercontracts();
        }
    }, [ contract, userAddress ]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Lista de contracts</h2>
            {loading ? (
                <p>Cargando contracts...</p>
            ) : (
                <div>
                    {contracts.length === 0 ? (
                        <p>No has creado contracts aún.</p>
                    ) : (
                        <ul>
                            {contracts.map((contract: any, index: number) => (
                                <li key={index} className="mb-4 p-3 border rounded-md">
                                    <div>
                                        <strong>contract #{index + 1}</strong>
                                    </div>
                                    <div>
                                        <strong>Vendedor:</strong> {contract.identificadorPartes.vendedor}
                                    </div>
                                    <div>
                                        <strong>Estado:</strong> {contract.estado === 1 ? "Offered" : contract.estado === 2 ? "Accepted" : "Other"}
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
