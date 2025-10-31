import { useWeb3Context } from "../hooks/useWeb3Context";
import { useAddressContractList } from "../hooks/useAddressContractList";

export default function ListarContratos() {
    const web3 = useWeb3Context();

    const { contracts, loading, error } = useAddressContractList(
        web3?.deployedContract || null,
        web3?.userAddress || null,
        web3?.isConnected || false,
        web3?.isLoading || false
    );

    if (web3?.isLoading) return <p>Inicializando conexión...</p>;
    if (!web3?.isConnected) return <p>Conecte su wallet para ver los contratos.</p>;
    if (error) return <p className="text-red-500">{error}</p>;

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
                        <li key={i} className="mb-4 p-3 border rounded-md">
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
        </div>
    );
}
