import type { LucideProps } from "lucide-react";
import type React from "react";
import type { PropsWithChildren } from "react";

export interface ISectionProps {
    title: string; 
    variant: "default" | "success" | "warning" | "info";
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

const Section:React.FC<PropsWithChildren<ISectionProps>> = ({icon:Icon, title, variant, children}) => {
    const variants = {
        default: "border-blue-600/50 bg-gray-800/50",
        success: "border-green-600/50 bg-gray-800/50",
        warning: "border-amber-600/50 bg-gray-800/50",
        info: "border-purple-600/50 bg-gray-800/50"
    };

    const iconColors = {
        default: "text-blue-400",
        success: "text-green-400",
        warning: "text-amber-400",
        info: "text-purple-400"
    };

    return (
        <div className={`border-2 rounded-xl p-6 mb-6 ${variants[ variant ]} shadow-lg backdrop-blur-sm`}>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-gray-700">
                {Icon && <Icon className={`w-6 h-6 ${iconColors[ variant ]}`} />}
                <h2 className="text-xl font-bold text-gray-100">{title}</h2>
            </div>
            {children}
        </div>
    );
};

export default Section;