import { ethers, id, JsonRpcProvider, Wallet } from "ethers";
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
    public async getNetworkInfo() {
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

    /** ========= OBTENER CONTRATO DESDE BLOCKCHAIN ========= **/
    public async obtenerContratoPorId(idContrato: string): Promise<ContratoOnChain> {
        try {
            if (!idContrato) {
                throw Error(`El parametro ID es obligatorio.`)
            }

            const contrato = BlockchainConnection.parseBlockchainContractToObject(this.contratoView.contratos(idContrato));

            // Insertar id del contrato
            return {
                ...contrato,
                id: Number(idContrato),
            };
        } catch (error) {
            throw Error(`Error obteniendo contrato desde blockchain -> ${error}`);
        }
    }

    public async obtenerTodosLosContratos(): Promise<ContratoOnChain[]> {
        try {
            const total = Number(await this.contratoView.contadorContratos());
            const contratos = [];

            for (let i = 1; i <= total; i++) {
                const contrato = await this.contratoView.contratos(i);
                contratos.push(
                    {
                        ...BlockchainConnection.parseBlockchainContractToObject(contrato),
                        id: i
                    }
                );
            }

            return contratos;
        } catch (error) {
            throw Error(`Error obteniendo todos los contratos desde blockchain -> ${error}`);
        }
    }

    /** ========= CREAR TRANSACCIÓN META-TX (Relayer) ========= **/
    public async firmarContratoMetaTx({ contractId, sellerAddress }: { contractId: number; sellerAddress: string }) {
    try {
        console.log(`Enviando meta transaccion para firma de contrato #${contractId}`);

        // Ejecuta la función del contrato por parte del relayer
        const tx = await blockchainConnection.contratoRelayer.firmarContratoMetaTx(
            contractId,
            `consentHash_${Date.now()}`,   // simulación hash de consentimiento (podrías usar uno real desde el front)
            `ipfs://evidencias/${sellerAddress}_${Date.now()}` // URI de evidencia (ej. logs u OTP en IPFS)
        );

        const receipt = await tx.wait();

        console.log(`✅ Contrato firmado por relayer. Hash: ${receipt.hash}`);

        return {
            hash: receipt.hash,
            status: receipt.status,
        };
    } catch (error) {
        console.error("❌ Error ejecutando transacción de firma:", error);
        throw error;
    }
}



}

export const blockchainConnection = new BlockchainConnection();