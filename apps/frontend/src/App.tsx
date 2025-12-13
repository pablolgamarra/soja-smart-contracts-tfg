import ErrorComponent from "@components/common/ErrorComponent";
import LoadingWeb3 from "@components/common/LoadingWeb3";
import { useWeb3Context } from "@hooks/useWeb3Context";
import Login from "@pages/Login";
import AppRouter from "@routes/AppRouter";

//Muestra la pagina de login si no se detecta conexion con la wallet
const App: React.FC = () => {
    const web3Context = useWeb3Context();

    if (!web3Context) {
        return <ErrorComponent message="Web3Context no disponible" />;
    }

    if (web3Context.isLoading) {
        return <LoadingWeb3 />;
    }

    return <AppRouter isConnected={web3Context.isConnected} />;
};


export default App;