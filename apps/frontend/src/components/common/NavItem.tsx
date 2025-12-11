import React from "react";
import { Link } from "react-router-dom";
import Button, { type IButtonProps } from "@components/common/Button";

interface INavItemProps {
    to: string;
    label: string;
    icon: React.ReactNode;
    variant: IButtonProps[ 'variant' ]; // Reutilizar el tipo de variante de Button
}

const NavItem: React.FC<INavItemProps> = ({ to, label, icon, variant }: INavItemProps) => {
    return (
        <li>
            <Link to={to} className="w-full">
                <Button variant={variant} className="w-full justify-center">
                    {icon}
                    {label}
                </Button>
            </Link>
        </li>
    );
}

export default NavItem;