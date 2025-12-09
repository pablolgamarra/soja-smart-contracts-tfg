import { useWeb3Context } from "@hooks/useWeb3Context";
import { User } from "lucide-react";
import { useState } from "react";
import type React from "react";

const UserStatusPopover: React.FC = () => {
    const web3Context = useWeb3Context();
    const [ isHovered, setIsHovered ] = useState<boolean>(false);

    const userAddress = web3Context.userAddress || "No disponible";
    const deployedContractAddress = web3Context.deployedContract?.target?.toString() || "No disponible";

    return (
        <li
            className="relative flex justify-center items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <User
                className="w-8 h-8 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors"
            />
            {isHovered && (
                <div
                    className="absolute top-full right-0 mt-2 p-4 bg-gray-700 border border-gray-600 rounded-lg shadow-2xl w-80 z-20 text-gray-200 animate-in fade-in slide-in-from-top-1"
                >
                    <h3 className="font-bold text-lg mb-3 text-white">
                        🔗 Datos de Conexión
                    </h3>

                    {/* Tarjeta de información */}
                    <div className="space-y-2 text-sm">
                        <p className="text-gray-300">
                            ✅ Conectado como:{" "}
                            <span className="font-mono text-xs text-blue-400 block truncate p-1 bg-gray-800 rounded">
                                {userAddress}
                            </span>
                        </p>
                        <p className="text-gray-300">
                            📜 Contrato activo:{" "}
                            <span className="font-mono text-xs text-green-400 block truncate p-1 bg-gray-800 rounded">
                                {deployedContractAddress}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </li>
    );
}

export default UserStatusPopover;