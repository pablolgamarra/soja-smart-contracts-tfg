import { useWeb3Context } from "../hooks/useWeb3Context";

export default function Login() {
    const {connectWallet} = useWeb3Context();

    return (
        <div className="p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">🔐 Iniciar sesión</h2>
            <button
                onClick={connectWallet}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
                {"Conectar con Metamask"}
            </button>
        </div>
    );
}
