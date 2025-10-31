import { useWeb3Context } from "../hooks/useWeb3Context";

export default function Login() {
    const {connectWallet} = useWeb3Context();

    return (
        <div className="min-h-screen h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-10 transition-colors duration-500">
            <div className="d-flex mx-auto rp-6 border rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Se debe conectar con Metamask</h2>
                <button
                    onClick={connectWallet}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    {"Conectar con Metamask"}
                </button>
            </div>
        </div>
    );
}
