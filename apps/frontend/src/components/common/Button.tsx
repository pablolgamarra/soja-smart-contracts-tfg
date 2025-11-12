import React from "react";
import type { PropsWithChildren } from "react";

export interface IButtonProps {
    type?: "button" | "submit" | "reset"; // permite controlar tipo del botón
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    disabled?: boolean;
    variant: "primary" | "secondary" | "success";
}

const Button: React.FC<PropsWithChildren<IButtonProps>> = ({
    children,
    type = "button",
    disabled = false,
    onClick,
    variant = "primary",
}) => {
    const baseClasses = "px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:-translate-y-1";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-900/50",
        secondary: "bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500 shadow-lg",
        success: "bg-green-600 text-white hover:bg-green-500 focus:ring-green-500 shadow-lg shadow-green-900/50"
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseClasses} ${variants[ variant ]}`}
        >
            {children}
        </button>
    );
};

export default Button;
