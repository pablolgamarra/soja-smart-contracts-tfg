import type React from "react";

interface ILoadingComponentProps {
    message?: string;
}

const LoadingComponent: React.FC<ILoadingComponentProps> = ({ message }: ILoadingComponentProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-400">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-6 text-xl">{message ? message : "Cargando..."}</p>
        </div>
    )
}

export default LoadingComponent;