import {ethers} from 'ethers';
import dotenv from 'dotenv';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../ethers.config.ts"; 

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.RELAYER_KEY as string, provider);

export async function crearTransaccion(data) {
    const { contractId, sellerAddress } = data;

    try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        console.log(`🔗 Ejecutando firma para contrato #${contractId} con vendedor ${sellerAddress}`);

        const tx = await contract.firmarContrato(contractId, sellerAddress); // método del Smart Contract
        const receipt = await tx.wait();

        console.log(`✅ Transacción confirmada: ${receipt.transactionHash}`);

        return {
            hash: receipt.transactionHash,
            status: receipt.status,
        };
    } catch (error) {
        console.error("❌ Error ejecutando transacción de firma:", error);
        throw error;
    }
}