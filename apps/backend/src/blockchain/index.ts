import { ethers } from "ethers";
import dotenv from "dotenv";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../ethers.config.ts";

dotenv.config();

// Provider de conexión con nodo blockchain
export const rpcProvider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// Relayer (Para firma desde el backend en nombre del vendedor)
export const relayerWallet = new ethers.Wallet(process.env.RELAYER_KEY as string, rpcProvider);

// Contrato de solo lectura
export const contratoView = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, rpcProvider);

// Contrato del relayer (Firmable)
export const contratoRelayer = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, relayerWallet);