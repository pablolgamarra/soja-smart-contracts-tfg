import type React from "react";

export interface IPageHeaderProps {
    title: string;
    description: string;
}

const SectionHeader: React.FC<IPageHeaderProps> = ({title, description}: IPageHeaderProps) => {
    return (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 mb-6 border border-gray-700">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                {title}
            </h1>
            <p className="text-gray-400 text-lg">{description}</p>
        </div>
    );
}

export default SectionHeader;