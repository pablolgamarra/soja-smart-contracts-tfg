import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../ethers.config"; // 👈 importás tu config

export interface Web3ContextType {
    provider: ethers.BrowserProvider | null;
    signer: ethers.Signer | null;
    userAddress: string;
    contract: ethers.Contract | null;
    connectWallet: () => Promise<void>;
}

export const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3ContextProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const [ provider, setProvider ] = useState<ethers.BrowserProvider | null>(null);
    const [ signer, setSigner ] = useState<ethers.Signer | null>(null);
    const [ userAddress, setUserAddress ] = useState<string>("");
    const [ contract, setContract ] = useState<ethers.Contract | null>(null);

    // 🔹 Conectar wallet
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Metamask no detectado");
            return;
        }

        try {
            const newProvider = new ethers.BrowserProvider(window.ethereum);
            await newProvider.send("eth_requestAccounts", []);
            const newSigner = await newProvider.getSigner();
            const address = await newSigner.getAddress();

            setProvider(newProvider);
            setSigner(newSigner);
            setUserAddress(address);

            console.log(`✅ Conectado con: ${address}`);
        } catch (error) {
            console.error(error);
            alert("Error al conectar con Metamask");
        }
    };

    // 🔹 Detectar cambios en cuenta o red
    useEffect(() => {
        if (!window.ethereum) return;

        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length > 0) setUserAddress(accounts[ 0 ]);
            else setUserAddress("");
        };

        const handleChainChanged = () => window.location.reload();

        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);

        return () => {
            window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            window.ethereum.removeListener("chainChanged", handleChainChanged);
        };
    }, []);

    // 🔹 Inicializar contrato cuando haya signer o provider
    useEffect(() => {
        if (!signer && !provider) return;

        try {
            const instance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer ?? provider);
            setContract(instance);
            console.log("📜 Contrato inicializado:", CONTRACT_ADDRESS);
        } catch (err) {
            console.error("❌ Error creando instancia del contrato:", err);
        }
    }, [ signer, provider ]);

    return (
        <Web3Context.Provider value={{ provider, signer, userAddress, contract, connectWallet }}>
            {children}
        </Web3Context.Provider>
    );
};