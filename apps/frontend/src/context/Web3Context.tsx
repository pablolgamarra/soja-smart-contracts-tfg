import React, {
    createContext,
    useCallback,
    useEffect,
    useState,
    useMemo,
    type JSX,
} from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../ethers.config";

export interface Web3ContextType {
    provider: ethers.BrowserProvider | null;
    signer: ethers.Signer | null;
    userAddress: string | null;
    isConnected: boolean;
    isLoading: boolean;
    deployedContract: ethers.Contract | null;
    connectWallet: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3ContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [ provider, setProvider ] = useState<ethers.BrowserProvider | null>(null);
    const [ signer, setSigner ] = useState<ethers.Signer | null>(null);
    const [ userAddress, setUserAddress ] = useState<string | null>(null);
    const [ isConnected, setIsConnected ] = useState(false);
    const [ deployedContract, setDeployedContract ] =
        useState<ethers.Contract | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);

    /** 🔹 Inicializa conexión si hay sesión previa */
    useEffect(() => {
        const init = async () => {
            if (!window.ethereum) {
                setIsLoading(false);
                return;
            }

            try {
                const web3Provider = new ethers.BrowserProvider(window.ethereum);
                setProvider(web3Provider);

                const accounts = await web3Provider.listAccounts();
                if (accounts.length > 0) {
                    const connectedSigner = await web3Provider.getSigner();
                    const addr = await connectedSigner.getAddress();
                    setSigner(connectedSigner);
                    setUserAddress(addr);
                    setIsConnected(true);
                }
            } catch (err) {
                console.error("Error al inicializar Web3 ->", err);
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, []);

    /** 🔹 Conecta MetaMask manualmente */
    const connectWallet = useCallback(async () => {
        if (!window.ethereum) {
            alert("MetaMask no detectado. Por favor, instale MetaMask e intente de nuevo.");
            return;
        }

        try {
            setIsLoading(true);
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            await web3Provider.send("eth_requestAccounts", []);
            const connectedSigner = await web3Provider.getSigner();
            const addr = await connectedSigner.getAddress();

            setProvider(web3Provider);
            setSigner(connectedSigner);
            setUserAddress(addr);
            setIsConnected(true);
        } catch (err) {
            console.error("Error al conectar con MetaMask ->", err);
            alert("Hubo un error al conectar con MetaMask. Por favor, intente de nuevo.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    /** 🔹 Escucha cambios de red o cuenta */
    useEffect(() => {
        if (!window.ethereum) return;

        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
                setSigner(null);
                setUserAddress(null);
                setIsConnected(false);
            } else {
                setUserAddress(accounts[ 0 ]);
                setIsConnected(true);
            }
        };

        const handleChainChanged = () => window.location.reload();

        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);

        return () => {
            window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            window.ethereum.removeListener("chainChanged", handleChainChanged);
        };
    }, []);

    /** 🔹 Inicializa contrato cuando haya conexión */
    useEffect(() => {
        if (!signer && !provider) return;

        try {
            const instance = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer ?? provider
            );
            setDeployedContract(instance);
            console.log("Conexion con Contrato Desplegado. Direccion ->:", CONTRACT_ADDRESS);
        } catch (err) {
            console.error("Error creando instancia del contrato desplegado ->", err);
        }
    }, [ signer, provider ]);

    /** 🔹 Memoriza el contexto (optimización) */
    const contextValue = useMemo(
        () => ({
            provider,
            signer,
            userAddress,
            isConnected,
            isLoading,
            deployedContract,
            connectWallet,
        }),
        [ provider, signer, userAddress, isConnected, isLoading, deployedContract, connectWallet ]
    );

    return (
        <Web3Context.Provider value={contextValue}>
            {children}
        </Web3Context.Provider>
    );
};

export default Web3Context;