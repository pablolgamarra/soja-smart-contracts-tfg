import type React from "react";

export interface IPageHeaderProps {
    title: string;
    description: string;
}

const SectionHeader: React.FC<IPageHeaderProps> = ({title, description}: IPageHeaderProps) => {
    return (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl border border-gray-700">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 drop-shadow">
                {title}
            </h1>
            <p className="text-gray-400 text-lg mt-2">
                {description}
            </p>
        </div>
    );
}

export default SectionHeader;