import { useWeb3Context } from "@hooks/useWeb3Context";
import Button from "@components/common/Button";

export default function Login() {
    const { connectWallet } = useWeb3Context();

    return (
        <div className="d-flex mx-auto rp-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Se debe conectar con Metamask</h2>
            <Button onClick={connectWallet} >Conectar a Metamask</Button>
        </div>
    );
}
