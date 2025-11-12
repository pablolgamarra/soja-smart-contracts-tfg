import { Link } from "react-router-dom"
import Button from "@components/common/Button";
import { Home, Pen, Plus } from "lucide-react";

const Navbar:React.FC = () => {
    return (
        <nav>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
                <li>
                    <Link to="/">
                        <Button 
                            variant="primary"
                        >
                            <>
                                <Home />
                                Inicio
                            </>
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/crear">
                    <Button 
                        variant="secondary"
                    >
                        <Plus />
                        Crear Contrato Nuevo
                    </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/firmar" >
                    <Button 
                        variant="success"
                    >
                        <Pen />
                        Firmar Contrato
                    </Button>
                    </Link>
                </li>
            </ul>            
        </nav>
    )
}

export default Navbar;