import { Link } from "react-router-dom"
import Button from "@components/common/Button";

const Navbar:React.FC = () => {
    return (
        <nav>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
                <li>
                    <Button 
                        className={"bg-green-600 hover:bg-green-500 transform hover:-translate-y-1 transition-all rounded-xl p-6 text-center font-semibold shadow-lg shadow-green-900/50"}
                    >
                        {<Link to="/">Home</Link>}
                    </Button>
                </li>
                <li>
                    <Button 
                        className="bg-blue-600 hover:bg-green-500 transform hover:-translate-y-1 transition-all rounded-xl p-6 text-center font-semibold shadow-lg shadow-green-900/50" 
                    >
                        {<Link to="/crear">Crear nuevo contrato</Link>}
                    </Button>
                </li>
                <li>
                    <Button 
                        className="bg-purple-600 hover:bg-green-500 transform hover:-translate-y-1 transition-all rounded-xl p-6 text-center font-semibold shadow-lg shadow-green-900/50" 
                    >
                        <Link to="/firmar" >Firmar un contrato</Link>
                    </Button>
                </li>
            </ul>            
        </nav>
    )
}

export default Navbar;