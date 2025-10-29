import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useWeb3Context } from "./hooks/useWeb3Context";
import NavigationButtons from "./components/NavigationButtons";
import ListarContratos from "./components/ListarContratos";
import FormContrato from "./components/ContratoForm";
import FirmarContrato from "./components/FirmarContrato";
import Login from "./components/Login";

export default function App() {
    const { userAddress, contract } = useWeb3Context();

    return (
        <Router>
            <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-10 transition-colors duration-500">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-green-400 text-center animate-pulse">
                    🌾 Smart — Contratos Inteligentes de Compra-Venta de Granos
                </h1>

                <div className="w-full max-w-5xl mt-8">
                    {userAddress ? (
                        <div>
                            <NavigationButtons />
                            <Routes>
                                <Route
                                    path="/"
                                    element={<ListarContratos userAddress={userAddress} />}
                                />
                                <Route path="/crear" element={<FormContrato />} />
                                <Route path="/firmar" element={<FirmarContrato />} />
                            </Routes>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-8">
                            <p className="text-lg md:text-xl text-center text-gray-300">
                                Conecta tu wallet para acceder a la dApp y gestionar contratos
                                inteligentes de granos de soja. Transparencia, seguridad y
                                trazabilidad en un solo lugar.
                            </p>

                            <Login />
                        </div>
                    )}
                </div>

                <footer className="mt-12 text-gray-500 text-sm">
                    © 2025 SoySmart DApp — Paraguay
                </footer>
            </div>
        </Router>
    );
}
