import { Link } from "react-router-dom";

export default function NavigationButtons() {
    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
            <Link
                to="/crear"
                className="bg-green-600 hover:bg-green-500 transform hover:-translate-y-1 transition-all rounded-xl p-6 text-center font-semibold shadow-lg shadow-green-900/50"
            >
                Crear Contrato
            </Link>
            <Link
                to="/firmar"
                className="bg-blue-600 hover:bg-blue-500 transform hover:-translate-y-1 transition-all rounded-xl p-6 text-center font-semibold shadow-lg shadow-blue-900/50"
            >
                Firmar Contrato
            </Link>
            <Link
                to="/"
                className="bg-purple-600 hover:bg-purple-500 transform hover:-translate-y-1 transition-all rounded-xl p-6 text-center font-semibold shadow-lg shadow-purple-900/50"
            >
                Listar Contratos
            </Link>
        </div>
    );
}
