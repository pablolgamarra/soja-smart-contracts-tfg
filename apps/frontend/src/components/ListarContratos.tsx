import { useWeb3Context } from "../hooks/useWeb3Context";
import { useAddressContractList } from "../hooks/useAddressContractList";
import { useState } from "react";

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
                                <strong>Vendedor:</strong> {c.identificadorPartes.vendedor}
                            </div>
                            <div>
                                <strong>Estado:</strong>{" "}
                                {c.estado === 1
                                    ? "Ofrecido"
                                    : c.estado === 2
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
                    <h3 className="text-xl font-semibold mb-4">Detalles del Contrato</h3>
                    <p><strong>Contrato ID:</strong> {selectedContract.id}</p> {/* Mostrar contractId */}
                    <p><strong>Vendedor:</strong> {selectedContract.identificadorPartes.vendedor}</p>
                    <p><strong>Comprador:</strong> {selectedContract.identificadorPartes.comprador}</p>
                    <p><strong>Incoterm:</strong> {selectedContract.condicionesComerciales.incoterm}</p>
                    <p><strong>Flete a cargo de:</strong> {selectedContract.condicionesComerciales.fleteACargoDe}</p>
                    <p><strong>Condiciones de calidad:</strong> {selectedContract.condicionesComerciales.condicionesCalidad}</p>
                    <p><strong>Cantidad (Toneladas):</strong> {selectedContract.condicionesComerciales.cantidadToneladas}</p>
                    <p><strong>Precio por tonelada:</strong> {selectedContract.condicionesComerciales.precioPorTonelada} ETH</p>
                    <p><strong>Lugar de entrega:</strong> {selectedContract.condicionesComerciales.lugarEntrega}</p>
                    <p><strong>Modalidad de pago:</strong> {selectedContract.condicionesEconomicas.modalidadPago}</p>
                    <p><strong>Estado del contrato:</strong>
                        {selectedContract.estado === 1
                            ? "Enviado"
                            : selectedContract.estado === 2
                                ? "Aceptado"
                                : selectedContract.estado === 3
                                    ? "Entregado"
                                    : selectedContract.estado === 4
                                        ? "Liquidado"
                                        : "Otro"}
                    </p>
                </div>
            )}
        </div>
    );
}
