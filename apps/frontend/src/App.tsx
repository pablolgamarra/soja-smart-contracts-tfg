import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ListarContratos from "./components/ListarContratos";
import FormContrato from "./components/ContratoForm";
import FirmarContrato from "./components/FirmarContrato";
import Login from "./components/Login";
import { useState } from "react";

export default function App() {
    const [ userAddress, setUserAddress ] = useState<string>("");
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
                <h1 className="text-4xl font-bold mb-10 text-green-700">🌾 Smart Soy — Contratos Inteligentes para Compra y Venta de Granos</h1>

                <Navigation />

                <div className="w-full max-w-4xl mt-10">
                    {userAddress ? (
                        // Si el usuario está logueado, muestra los contratos
                            <Routes>
                                <Route path="/" element={<ListarContratos userAddress={userAddress}/>} />
                                <Route path="/crear" element={<FormContrato />} />
                                <Route path="/firmar" element={<FirmarContrato />} />
                            </Routes>
                    ) : (
                        // Si no está logueado, muestra el formulario de login
                        <Login setUserAddress={setUserAddress} />
                    )}
                </div>

            </div>
        </Router>
    );
}
