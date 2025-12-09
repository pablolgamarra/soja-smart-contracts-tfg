import { useWeb3Context } from "@hooks/useWeb3Context";
import { useToast } from "@hooks/useToast";
import LoginCard from "@components/auth/LoginCard";
import { useState } from "react";
import AuthLayout from "@components/layouts/AuthLayout";

export default function Login() {
    const { connectWallet } = useWeb3Context();
    const { addToast } = useToast();

    const [ isConnecting, setIsConnecting ] = useState<boolean>(false);

    const handleConnectWallet = async () => {
        setIsConnecting(true);
        try {
            await connectWallet();
        } catch (error) {
            addToast((error as Error).message || "Conexión rechazada o fallida.", "error");
            setIsConnecting(false);
        }
    }

    return (
        <AuthLayout>
            <LoginCard
                onConnect={handleConnectWallet}
                isConnecting={isConnecting}
            />
        </AuthLayout>
    );
}