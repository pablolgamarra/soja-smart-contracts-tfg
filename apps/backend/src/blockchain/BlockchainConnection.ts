import { Contract, ethers, JsonRpcProvider, Wallet } from "ethers";
import { getEnv } from "src/helpers/index.ts";
import {ContratoGranosSoja, ContratoGranosSoja__factory} from "./types/index.ts";

const CONFIG = {
    RPC: getEnv("RPC_URL"),
    RELAYER_KEY: getEnv("RELAYER_KEY"),
    CONTRACT_ADDRESS: getEnv("DEPLOYED_CONTRACT_ADDRESS")
};

export class BlockchainConnection {
    readonly rpcProvider: JsonRpcProvider;
    readonly relayerWallet: Wallet;
    readonly contratoView: ContratoGranosSoja
    readonly contratoRelayer: ContratoGranosSoja;

    constructor() {
        // Inicializar provider y contrato
        this.rpcProvider = new ethers.JsonRpcProvider(CONFIG.RPC);
        this.relayerWallet = new ethers.Wallet(CONFIG.RELAYER_KEY, this.rpcProvider);
        
        // this.contratoView = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, this.rpcProvider);
        // this.contratoRelayer = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, this.relayerWallet);
        this.contratoView = ContratoGranosSoja__factory.connect(CONFIG.CONTRACT_ADDRESS, this.rpcProvider);
        this.contratoRelayer = ContratoGranosSoja__factory.connect(CONFIG.CONTRACT_ADDRESS, this.relayerWallet);
    }

    /**
     * Retorna información de la red actual
     */
    async getNetworkInfo() {
        const network = await this.rpcProvider.getNetwork();
        console.log(`Conectado a red: ${network.name} (chainId: ${network.chainId})`);
    }
}

export const blockchainConnection = new BlockchainConnection();