import { useState } from "react";
import { ethers } from "ethers";
import FormCrearContrato from "./components/ContratoForm";
import FirmarContrato from "./components/FirmarContrato";

function App() {
    const [ address, setAddress ] = useState<string | null>(null);
    const [ isConnected, setIsConnected ] = useState(false);

    // Función para conectar MetaMask
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // Solicita acceso a la cuenta de MetaMask
                const provider = new ethers.BrowserProvider((window as any).ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const userAddress = (await signer).getAddress();
                setAddress(await userAddress);
                setIsConnected(true);
            } catch (error) {
                console.error("Error al conectar con MetaMask:", error);
            }
        } else {
            alert("Por favor, instala MetaMask.");
        }
    };

    return (
        <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center gap-10">
            <h1 className="text-4xl font-bold text-green-800">
                🌾 DApp Smart Soy — Contratos Inteligentes de Compra y Venta
            </h1>

            {/* Botón para conectar MetaMask */}
            {!isConnected ? (
                <button
                    onClick={connectWallet}
                    className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg"
                >
                    Conectar con MetaMask
                </button>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold text-green-700">
                        Bienvenido, {address}
                    </h2>
                </div>
            )}

            {/* Mostrar componentes solo si MetaMask está conectado */}
            {isConnected && (
                <div className="flex gap-10 mt-8">
                    <FormCrearContrato />
                    <FirmarContrato />
                </div>
            )}
        </div>
    );
}

export default App;
