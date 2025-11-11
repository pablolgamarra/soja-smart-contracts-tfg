import type { PropsWithChildren } from "react";
import type React from "react";

export interface IButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>)=>void;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<PropsWithChildren<IButtonProps>> = ({children, disabled, onClick, className})=>{
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={className || "px-4 py-2 bg-blue-600 text-white rounded-lg"}
        >
            {children}
        </button>
    )
}

export default Button;