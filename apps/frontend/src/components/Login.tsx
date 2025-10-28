import { useState } from "react";
import { ethers } from "ethers";

export default function Login({ setUserAddress }: { setUserAddress: React.Dispatch<React.SetStateAction<string>> }) {
    const [ loading, setLoading ] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
            if (!window.ethereum) {
                alert("Metamask no detectado");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();
            setUserAddress(userAddress);
            alert(`Bienvenido, tu dirección es: ${userAddress}`);
        } catch (error) {
            console.error(error);
            alert("Error al conectar con Metamask");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">🔐 Iniciar sesión</h2>
            <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                disabled={loading}
            >
                {loading ? "Conectando..." : "Conectar con Metamask"}
            </button>
        </div>
    );
}
