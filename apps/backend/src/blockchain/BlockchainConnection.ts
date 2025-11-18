import { ethers, JsonRpcProvider, Wallet } from "ethers";
import { convertBigIntToString, getEnv, parseUnixSecondsToDate } from "src/helpers/index.ts";
import {ContratoGranosSoja, ContratoGranosSoja__factory} from "./types/index.ts";
import { EstadoContrato, TipoContrato, type ContratoOnChain} from "@types/Contrato.ts";

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

    public static parseBlockchainContractToObject(contratoBlockchain: ContratoGranosSoja.ContratoStructOutput) : ContratoOnChain {
        return {
            id: 0,

            nombreComprador: contratoBlockchain.partes.nombreComprador,
            billeteraComprador: contratoBlockchain.partes.comprador.toString(),
            nroFiscalComprador: contratoBlockchain.partes.nroIdentidadComprador,

            nombreVendedor: contratoBlockchain.partes.nombreVendedor,
            billeteraVendedor: contratoBlockchain.partes.vendedor.toString(),
            nroFiscalVendedor: contratoBlockchain.partes.nroIdentidadVendedor,
            
            nombreBroker: contratoBlockchain.partes.nombreBroker,
            nroFiscalBroker: contratoBlockchain.partes.nroIdentidadBroker,
            billeteraBroker: contratoBlockchain.partes.broker.toString(),

            // CONDICIONES DEL GRANO
            cantidadToneladas: Number(convertBigIntToString(contratoBlockchain.condicionesGrano.cantidadToneladasMetricas)),
            tipoGrano: contratoBlockchain.condicionesGrano.tipoGrano,
            cosecha: contratoBlockchain.condicionesGrano.cosecha,

            // CONDICIONES DE ENTREGA
            empaque: contratoBlockchain.condicionesEntrega.empaque,
            fechaEntregaInicio: parseUnixSecondsToDate(contratoBlockchain.condicionesEntrega.fechaEntregaInicio),
            fechaEntregaFin: parseUnixSecondsToDate(contratoBlockchain.condicionesEntrega.fechaEntregaFin),

            // CONDICIONES DE PRECIO
            tipoContrato: Number(convertBigIntToString(contratoBlockchain.condicionesPrecio.tipoContrato)) as TipoContrato,
            precioPorToneladaMetrica: Number(convertBigIntToString(contratoBlockchain.condicionesPrecio.precioPorToneladaMetrica)),
            precioCBOTBushel: Number(convertBigIntToString(contratoBlockchain.condicionesPrecio.precioCBOTBushel)),
            ajusteCBOT: Number(convertBigIntToString(contratoBlockchain.condicionesPrecio.ajusteCBOT)), // al par=0 / más=1 / menos=-1
            fechaPrecioChicago: parseUnixSecondsToDate(contratoBlockchain.condicionesPrecio.fechaPrecioChicago),
            incoterm: contratoBlockchain.condicionesPrecio.incoterm,
            precioFinal: Number(convertBigIntToString(contratoBlockchain.condicionesPrecio.precioFinal)),

            // CONDICIONES EMBARQUE
            puertoEmbarque: contratoBlockchain.condicionesEmbarque.puertoEmbarque,
            destinoFinal: contratoBlockchain.condicionesEmbarque.destinoFinal,

            hashVersionContrato: contratoBlockchain.hashVersionContrato,
            evidenceURI: contratoBlockchain.evidenceURI,
            
            fechaCelebracionContrato: parseUnixSecondsToDate(contratoBlockchain.fechaCelebracionContrato),
            
            estado: Number(contratoBlockchain.estado) as EstadoContrato,

            clausulasAdicionales: contratoBlockchain.clausulasAdicionales.map(cl => ({
                textoClausula: cl.textoClausula,
                CID: cl.CID
            })),
        };
    }
}

export const blockchainConnection = new BlockchainConnection();