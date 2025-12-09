import AppTitle from "@components/common/AppTitle";
import { type PropsWithChildren } from "react"

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <main className="min-h-screen w-full bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-10 transition-colors duration-500">
            <AppTitle />
            {children}
        </main>
    );
}

export default AuthLayout;