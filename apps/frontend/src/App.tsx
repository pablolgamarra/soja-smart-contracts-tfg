import ErrorComponent from "@components/common/ErrorComponent";
import { useWeb3Context } from "@hooks/useWeb3Context";
import Login from "@pages/Login";
import AppRouter from "@routes/AppRouter";

const App:React.FC = ()=>{
    const web3Context = useWeb3Context();

    if(!web3Context) return <ErrorComponent message="Web3Context no disponible"></ErrorComponent> 

    if(!web3Context.isConnected) return <Login />;

    if (web3Context.isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-500">Inicializando conexión Web3...</p>
                <p className="mt-4 text-gray-500">Verifique el panel de Metamask</p>
            </div>
        );
    }

    return <AppRouter/>
}

export default App;