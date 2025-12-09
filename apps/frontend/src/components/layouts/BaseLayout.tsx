import { type PropsWithChildren } from "react"
import Navbar from "@components/common/Navbar";
import Footer from "@components/common/Footer";
import AppTitle from "@components/common/AppTitle";

const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-gray-900 text-gray-100 flex flex-col transition-colors duration-500">
            <AppTitle />
            <Navbar />

            <main className="flex-grow w-full p-4 md:p-8 lg:p-12">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default BaseLayout;