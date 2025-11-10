import { Fragment, type PropsWithChildren } from "react"
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

const PageWrapper:React.FC<PropsWithChildren> = ({children}) => {
    return (
        <Fragment>
            <main className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-10 transition-colors duration-500">
                <Navbar />
                    {children}
                <Footer />
            </main>
        </Fragment>
    )
}

export default PageWrapper;