import { useWeb3Context } from "@hooks/useWeb3Context";
import Button from "@components/common/Button";
import { useToast } from "@hooks/useToast";

export default function Login() {
    const { connectWallet } = useWeb3Context();
    const { addToast } = useToast();

    const handleConnectWallet = async () => {
        try {
            await connectWallet();
        } catch (error) {
            addToast((error as Error).message, "error");
        }
    }

    return (
        <main className="min-h-screen w-full bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-10 transition-colors duration-500">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-green-400 text-center animate-pulse">
                🌾 Smart — Contratos Inteligentes de Compra-Venta de Granos
            </h1>
            <div className="flex flex-col mx-auto min-w-6/12 rp-6 border rounded-lg shadow-md p-7">
                <h2 className="text-xl font-semibold mb-12">Se debe conectar con una Wallet Metamask para continuar</h2>
                <Button variant="primary" onClick={handleConnectWallet} >Conectar a Metamask</Button>
            </div>
        </main>
    );
}
