import Button from "@components/common/Button";
import type React from "react";

interface LoginCardProps {
    onConnect: () => void;
    isConnecting: boolean;
}

const LoginCard: React.FC<LoginCardProps> = ({ onConnect, isConnecting }: LoginCardProps) => {
    return (
        <div className="flex flex-col mx-auto w-full max-w-sm lg:max-w-md bg-gray-800 p-8 border border-gray-700 rounded-xl shadow-2xl space-y-6">
            <p className="text-gray-400">
                Se requiere una Wallet (como Metamask) para acceder a los contratos inteligentes de la aplicación.
            </p>

            <a href="https://chromewebstore.google.com/detail/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank" rel="noopener noreferrer">
                <p className="text-sm text-gray-500 hover:text-green-500 transition-colors">
                    Por favor <span className="font-bold underline underline-offset-2">instale y configure</span> Metamask si no lo tiene.
                </p>
            </a>

            <Button
                variant="primary"
                onClick={onConnect}
                disabled={isConnecting}
            >
                {isConnecting ? (
                    <span className="flex items-center gap-2">
                        Conectando...
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    </span>
                ) : (
                    "Conectar con Wallet"
                )}
            </Button>
        </div>
    );
}

export default LoginCard;