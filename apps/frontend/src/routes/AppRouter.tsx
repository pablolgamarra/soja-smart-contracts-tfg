import ContratoDetalle from "@pages/ContratoDetalle"
import CrearContrato from "@pages/CrearContrato"
import ErrorPage from "@pages/ErrorPage"
import FirmarContrato from "@pages/FirmarContrato"
import Home from "@pages/Home"
import Login from "@pages/Login"
import { Route, Routes } from "react-router-dom"

interface AppRouterProps {
    isConnected: boolean;
}

const AppRouter: React.FC<AppRouterProps> = ({ isConnected }) => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={isConnected ? <Home /> : <Login />} />
            <Route path="/crear" element={isConnected ? <CrearContrato /> : <Login />} />
            <Route path="/firmar" element={isConnected ? <FirmarContrato /> : <Login />} />

            {/* Esta ruta NO requiere conexión */}
            <Route path="/vendedor/firmar" element={<FirmarContrato vendedor/>} />

            <Route path="/contrato/:id" element={isConnected ? <ContratoDetalle /> : <Login />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};


export default AppRouter