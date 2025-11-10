import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useWeb3Context } from "@hooks/useWeb3Context";
import NavigationButtons from "@components/NavigationButtons";
import ListarContratos from "@components/ListarContratos";
import FormContrato from "@components/contrato/forms/crear/FormContratoRegister";
import FirmarContrato from "@components/FirmarContrato";
import Login from "@components/Login";
import ErrorComponent from "@components/common/ErrorComponent";

export default function App() {
    const web3Context = useWeb3Context();

    if (!web3Context) return <ErrorComponent message="Web3Context no disponible" />;

    if (web3Context.isLoading) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-500">Inicializando conexión Web3...</p>
                    <p className="mt-4 text-gray-500">Verifique el panel de Metamask</p>
                </div>
            );
    }

    //Mandar a login si no hay conexion con metamask
    if(!web3Context.isConnected){
        return <Login />;
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-10 transition-colors duration-500">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-green-400 text-center animate-pulse">
                    🌾 Smart — Contratos Inteligentes de Compra-Venta de Granos
                </h1>

                <div className="w-full max-w-5xl mt-8">
                    <div className="p-6">
                     <p className="mb-3">
                         ✅ Conectado como:{" "}
                         <span className="font-mono text-sm">{web3Context.userAddress}</span>
                     </p>
                     <p>
                         📜 Contrato activo:{" "}
                         <span className="font-mono text-sm">
                             {web3Context.deployedContract?.target?.toString()}
                         </span>
                     </p>
                 </div>
                        <div>
                            <NavigationButtons />
                            <Routes>
                                <Route
                                    path="/"
                                    element={<ListarContratos/>}
                                />
                                <Route path="/crear" element={<FormContrato />} />
                                <Route path="/firmar" element={<FirmarContrato />} />
                            </Routes>
                        </div>
                </div>

            <footer className="mt-12 text-gray-500 text-sm">
                © 2025 Smart DApp — Compra y Venta de Granos con Contratos Inteligentes
            </footer>
            </div>
        </Router>
    );
}