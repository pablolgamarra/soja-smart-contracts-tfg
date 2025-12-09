const LoadingWeb3:React.FC = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-400">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-6 text-xl">Inicializando conexión Web3...</p>
        <p className="mt-2 text-md">Verifique el panel de Metamask</p>
    </div>
);

export default LoadingWeb3;