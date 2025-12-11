import { useWeb3Context } from "@hooks/useWeb3Context";
import { useAddressContractList } from "@hooks/useAddressContractList";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ContratoListItem from "@components/contrato/lists/ContratoListItem";
import { useToast } from "@hooks/useToast";
import SectionHeader from "@components/common/SectionHeader";
import LoadingComponent from "@components/common/LoadingComponent";

const ListaContratos: React.FC = () => {
    const web3 = useWeb3Context();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [selectedContract, setSelectedContract] = useState<any | null>(null);
    
    const { contracts, loading } = useAddressContractList(
        web3?.deployedContract || null,
        web3?.userAddress || null,
        web3?.isConnected || false,
        web3?.isLoading || false
    );

    const handleSelectContract = useCallback((contract: any) => {
        setSelectedContract(prev => (prev === contract ? null : contract));
    }, []);

    const handleNavigate = useCallback((id: string) => {
        navigate(`/contrato/${id}`);
    }, [navigate]);

    const handleResendOTP = useCallback((id: string) => {
        console.log(`Reenviando OTP para contrato: ${id}`);
        addToast(`Solicitud para reenviar OTP para contrato #${id} enviada.`, "info");
    }, [addToast]);

    return (
        <>
            <SectionHeader title="Contratos Registrados" description="Lista actualizada de tus contratos en blockchain" />
            
            {loading ? (
                <LoadingComponent message="Cargando contratos registrados..."/>
            ) : contracts.length === 0 ? (
                <p className="text-gray-400">No hay contratos registrados.</p>
            ) : (
                <div className="space-y-3">
                    {contracts.map((c: any, i: number) => (
                        <ContratoListItem
                            key={c.id || i}
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
        </>
    );
}

export default ListaContratos;