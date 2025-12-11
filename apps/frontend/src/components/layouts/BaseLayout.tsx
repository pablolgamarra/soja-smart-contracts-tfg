import { type PropsWithChildren } from "react"
import Navbar from "@components/common/Navbar";
import Footer from "@components/common/Footer";
import AppTitle from "@components/common/AppTitle";

const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-gray-900 text-gray-100 flex flex-col transition-colors duration-500">
            <main className="flex-grow w-full p-4 md:p-8 lg:p-12">
            <AppTitle />
            <Navbar />

                <div className="flex flex-col gap-6 p-8 bg-gray-900 rounded-xl shadow-2xl text-gray-100 mt-12 w-full max-w-5xl mx-auto border border-gray-700">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default BaseLayout;