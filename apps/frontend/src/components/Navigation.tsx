import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="p-4 bg-green-700 text-white">
            <ul className="flex gap-6">
                <li>
                    <Link to="/" className="hover:underline">
                        Listar Contratos
                    </Link>
                </li>
                <li>
                    <Link to="/crear" className="hover:underline">
                        Crear Contrato
                    </Link>
                </li>
                <li>
                    <Link to="/firmar" className="hover:underline">
                        Firmar Contrato
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
