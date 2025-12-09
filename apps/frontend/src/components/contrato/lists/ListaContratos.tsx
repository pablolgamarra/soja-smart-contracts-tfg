// @components/contrato/lists/ListaContratos.tsx (Container)
import { useWeb3Context } from "@hooks/useWeb3Context";
import { useAddressContractList } from "@hooks/useAddressContractList";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ContratoListItem from "./ContratoListItem"; // Nuevo componente
import LoadingComponent from "@components/common/LoadingComponent"; // Reutilizaremos un componente de carga (si no lo tienes, créalo)
import { useToast } from "@hooks/useToast"; // Para mensajes de Resend OTP
import SectionHeader from "@components/common/SectionHeader";

// Componente para manejar los estados de carga, error y no conectado
const ContractsStatus = ({ web3, error }: { web3: any, error: string | null }) => {
    if (web3?.isLoading) return <Loader message="Inicializando conexión..." />;
    if (!web3?.isConnected) return <p className="text-gray-400">Conecte su wallet para ver los contratos.</p>;
    if (error) return <p className="text-red-400">{error}</p>;
    return null;
}

const ListaContratos: React.FC = () => {
    const web3 = useWeb3Context();
    const navigate = useNavigate();
    const { addToast } = useToast();

    // 💡 IMPORTANTE: Mover la lógica de navegación y handlers fuera del mapeo
    const [selectedContract, setSelectedContract] = useState<any | null>(null);
    
    // Obtención de datos
    const { contracts, loading, error } = useAddressContractList(
        web3?.deployedContract || null,
        web3?.userAddress || null,
        web3?.isConnected || false,
        web3?.isLoading || false
    );

    // 1. Mostrar estado de la conexión/error
    const statusComponent = ContractsStatus({ web3, error });
    if (statusComponent) return statusComponent;


    // 2. Handlers memoizados para pasar al componente hijo
    const handleSelectContract = useCallback((contract: any) => {
        setSelectedContract(prev => (prev === contract ? null : contract));
    }, []);

    const handleNavigate = useCallback((id: string) => {
        navigate(`/contrato/${id}`);
    }, [navigate]);

    const handleResendOTP = useCallback((id: string) => {
        // 💡 Lógica real para reenviar el OTP
        console.log(`Reenviando OTP para contrato: ${id}`);
        addToast(`Solicitud para reenviar OTP para contrato #${id} enviada.`, "info");
        // Aquí iría la llamada a la función del contrato o API para reenviar el código.
    }, [addToast]);

    // 3. Renderizado final
    return (
        <div className="flex flex-col gap-6 p-8 bg-gray-900 rounded-xl shadow-2xl text-gray-100 mt-12 w-full max-w-5xl mx-auto border border-gray-700">

            <SectionHeader title="Contratos Registrados" description="Lista actualizada de tus contratos en blockchain" />
            
            {/* LISTA */}
            {loading ? (
                <p className="text-gray-300">Cargando contratos...</p>
            ) : contracts.length === 0 ? (
                <p className="text-gray-400">No hay contratos registrados.</p>
            ) : (
                <div className="space-y-3">
                    {contracts.map((c: any, i: number) => (
                        <ContratoListItem
                            key={c.id || i} // Usa el ID si existe, si no, usa el índice
                            contrato={c}
                            index={i}
                            isSelected={selectedContract === c}
                            onSelect={handleSelectContract}
                            onNavigate={handleNavigate}
                            onResendOTP={handleResendOTP}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaContratos;