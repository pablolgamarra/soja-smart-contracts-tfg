import { useWeb3Context } from "@hooks/useWeb3Context";
import { useAddressContractList } from "@hooks/useAddressContractList";
import { useState } from "react";
import CardContratoCompact from "../cards/CardContratoCompact";

export default function ListarContratos() {
    const web3 = useWeb3Context();
    const [ selectedContract, setSelectedContract ] = useState<any | null>(null);

    const { contracts, loading, error } = useAddressContractList(
        web3?.deployedContract || null,
        web3?.userAddress || null,
        web3?.isConnected || false,
        web3?.isLoading || false
    );

    if (web3?.isLoading) return <p>Inicializando conexión...</p>;
    if (!web3?.isConnected) return <p>Conecte su wallet para ver los contratos.</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const handleSelectContract = (contract: any) => {
        if (selectedContract === contract) {
            setSelectedContract(null);
            return;
        }

        setSelectedContract(contract);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">📋 Contratos creados</h2>

            {loading ? (
                <p>Cargando contratos...</p>
            ) : contracts.length === 0 ? (
                <p>No hay contratos registrados.</p>
            ) : (
                <ul>
                    {contracts.map((c: any, i: number) => (
                        <li
                            key={i}
                            className="mb-4 p-3 border rounded-md cursor-pointer hover:bg-gray-700"
                            onClick={() => handleSelectContract(c)}
                        >
                            <div>
                                <strong>Contrato #{i + 1}</strong>
                            </div>
                            <div>
                                <strong>Vendedor:</strong> {c.partes.vendedor}
                            </div>
                            <div>
                                <strong>Estado:</strong>{" "}
                                {c.estado.toString() === "0"
                                    ? "Enviado"
                                    : c.estado === "2"
                                        ? "Aceptado"
                                        : "Otro"}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Mostrar detalles del contrato seleccionado */}
            {selectedContract && (
                <div className="mt-6 p-4 border rounded-md bg-gray-800 text-gray-100">
                    <CardContratoCompact contrato={selectedContract}/>
                </div>
            )}
        </div>
    );
}
