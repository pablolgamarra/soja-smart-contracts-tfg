import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../ethers.config";

export const useDeployedContractInstance = (signerOrProvider : ethers.Signer | null) => {
    const [deployedContract, setDeployedContract] = useState<ethers.Contract | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDeployedContract = async () => {
            try {
                setLoading(true);
                if (signerOrProvider) {
                    const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
                    setDeployedContract(contractInstance);
                }
            } catch (err) {
                setError("Error al obtener el contrato desplegado");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDeployedContract();
    }, [signerOrProvider]);

    return {deployedContract, loading, error};
}