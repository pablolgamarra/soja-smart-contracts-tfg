import {ethers} from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.RELAYER_KEY as string, provider);

export async function crearTransaccion(data:any){
    const {to, value} = data;
    let tx;

    try {
        tx = await signer.sendTransaction({
            to,
            value: ethers.parseEther(value.toString())
        });
    }catch (error) {
        console.error("Error al conectar con el proveedor o crear el firmante:", error);
    }

    return tx? tx.hash : null;
}