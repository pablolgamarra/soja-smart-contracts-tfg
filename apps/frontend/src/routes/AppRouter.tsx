import CrearContrato from "@pages/CrearContrato"
import ErrorPage from "@pages/ErrorPage"
import FirmarContrato from "@pages/FirmarContrato"
import Home from "@pages/Home"
import Login from "@pages/Login"
import { Route, Routes } from "react-router-dom"

const AppRouter:React.FC = () => {
    return(
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/crear" element={<CrearContrato />} />
                <Route path="/firmar" element={<FirmarContrato />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
    )
}

export default AppRouter