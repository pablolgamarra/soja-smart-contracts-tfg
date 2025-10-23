import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS, RPC_URL } from "../ethers.config";

export function useContrato() {
    const [ contrato, setContrato ] = useState<ethers.Contract | null>(null);

    useEffect(() => {
        const init = async () => {
            const provider = new ethers.JsonRpcProvider(RPC_URL);
            const signer = await provider.getSigner(0);
            const contratoInstancia = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            setContrato(contratoInstancia);
        };
        init().catch(console.error);
    }, []);

    return contrato;
}
