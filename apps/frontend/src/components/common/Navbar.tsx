import React, { useState } from "react"; // ⬅️ Importar useState
import { Link } from "react-router-dom";
import Button from "@components/common/Button";
import { Home, Pen, Plus, User } from "lucide-react";
import { useWeb3Context } from "@hooks/useWeb3Context";

const Navbar: React.FC = () => {
    const web3Context = useWeb3Context(); // Obtener el contexto
    const [ isHovered, setIsHovered ] = useState(false); // ⬅️ Estado para controlar el hover

    return (
        <nav>
            <ul className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full mt-6">
                <li>
                    <Link to="/">
                        <Button variant="primary">
                            <>
                                <Home />
                                Inicio
                            </>
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/crear">
                        <Button variant="secondary">
                            <Plus />
                            Crear Contrato Nuevo
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/firmar" >
                        <Button variant="success">
                            <Pen />
                            Firmar Contrato
                        </Button>
                    </Link>
                </li>
                <li
                    className="relative flex justify-center items-center"
                >
                    <User 
                        className="w-8 h-8 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors"
                        onMouseEnter={() => setIsHovered(true)} // Mostrar al entrar
                        onMouseLeave={() => setIsHovered(false)} // Ocultar al salir
                     />
                    {isHovered && (
                        <div className="absolute top-full right-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-xl w-80 z-10">
                            <h3 className="font-bold text-gray-800 mb-3">
                                🔗 Datos de Conexión
                            </h3>
                            <p className="mb-3 text-sm text-gray-600">
                                ✅ Conectado como:{" "}
                                <span className="font-mono text-xs text-blue-600 truncate">
                                    {web3Context.userAddress}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600">
                                📜 Contrato activo:{" "}
                                <span className="font-mono text-xs text-green-600 truncate">
                                    {web3Context.deployedContract?.target?.toString()}
                                </span>
                            </p>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;