import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS, RPC_URL } from "../../ethers.config";

export function useContrato() {
    const [ contrato, setContrato ] = useState<ethers.Contract | null>(null);
    const [ signer, setSigner ] = useState<ethers.Signer | null>(null);

    useEffect(() => {
        const init = async () => {
            let provider;
            let activeSigner;

            if (typeof window !== "undefined" && (window as any).ethereum) {
                // 🌐 Entorno navegador → usar Metamask
                provider = new ethers.BrowserProvider((window as any).ethereum);
                activeSigner = await provider.getSigner();
                console.log("🔗 Conectado a Metamask:", await activeSigner.getAddress());
            } else {
                // 🧠 Fallback → RPC directo (para lecturas o relayer)
                provider = new ethers.JsonRpcProvider(RPC_URL);
                activeSigner = await provider.getSigner(0).catch(() => null);
                console.log("🧩 Conectado al RPC local:", RPC_URL);
            }

            const contratoInstancia = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, activeSigner ?? provider);
            setSigner(activeSigner);
            setContrato(contratoInstancia);
        };

        init().catch(console.error);
    }, []);

    return { contrato, signer };
}
