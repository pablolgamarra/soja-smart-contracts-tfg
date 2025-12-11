import React from "react";

const AppTitle: React.FC = () => (
    <div className="flex flex-col items-center justify-center mb-12 select-none">
        <img 
            src="/logo.svg" 
            alt="Logo Beanchain"
            className="w-20 h-20 md:w-28 md:h-28 mb-4 drop-shadow-lg"
        />

        <h1 className="
            text-3xl md:text-5xl font-extrabold text-center 
            text-transparent bg-clip-text 
            bg-gradient-to-r from-purple-400 via-blue-400 to-green-400
            drop-shadow-xl tracking-wide
        ">
            Smart Contracts de Compra-Venta de Granos
        </h1>
    </div>
);

export default AppTitle;
