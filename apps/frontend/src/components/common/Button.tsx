import type { PropsWithChildren } from "react";
import type React from "react";

export interface IButtonProps {
    onClick?: ()=>void;
    className?: string;
}

const Button: React.FC<PropsWithChildren<IButtonProps>> = ({children, onClick, className})=>{
    return (
        <button
            onClick={onClick}
            className={className || "px-4 py-2 bg-blue-600 text-white rounded-lg"}
        >
            {children}
        </button>
    )
}

export default Button;