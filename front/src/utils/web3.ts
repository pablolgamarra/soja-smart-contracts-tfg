import type { BrowserProvider } from "ethers";
import { ethers } from "ethers";

const getProvider = () => {
    if(window.ethereum == null){
        // Devolver provider por defecto
        return ethers.getDefaultProvider();
    }

    return new ethers.BrowserProvider(window.ethereum);
}

const getSigner = async (provider:BrowserProvider) => {
    if(provider == null) return null;

    return await provider.getSigner();
}

export default {getProvider, getSigner};