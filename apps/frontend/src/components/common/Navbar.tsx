import React from "react";
import NavItem from "./NavItem";
import UserStatusPopover from "./UserStatusPopover";
import { Home, Pen, Plus } from "lucide-react";

const Navbar: React.FC = () => {
    // Rutas
    const navItems = [
        { to: "/", label: "Inicio", icon: <Home />, variant: "primary" as const },
        { to: "/crear", label: "Crear Contrato Nuevo", icon: <Plus />, variant: "secondary" as const },
        { to: "/firmar", label: "Firmar Contrato", icon: <Pen />, variant: "success" as const },
    ];

    return (
        <nav className="w-full">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 w-full max-w-5xl mx-auto">
                {navItems.map((item) => (
                    <NavItem
                        key={item.to}
                        to={item.to}
                        label={item.label}
                        icon={item.icon}
                        variant={item.variant}
                    />
                ))}

                <UserStatusPopover />
            </ul>
        </nav>
    );
};

export default Navbar;