import { Contrato } from "@types/Contrato.ts";
import { blockchainConnection, BlockchainConnection } from "src/blockchain/BlockchainConnection.ts";

/** ========= 📄 OBTENER CONTRATO DESDE BLOCKCHAIN ========= **/
export async function obtenerContratoDesdeBlockchain(idContrato: string): Promise<Contrato> {
    try {
        if(!idContrato) {
            throw Error(`El parametro ID es obligatorio.`)
        }
        const contrato= BlockchainConnection.parseBlockchainContractToObject(blockchainConnection.contratoView.contratos(idContrato));

        // Insertar id del contrato
        return {
            ...contrato,
            id: Number(idContrato),
        };
    } catch (error) {
        throw Error(`Error obteniendo contrato desde blockchain -> ${error}`);
    }
}

/** ========= ✍️ CREAR TRANSACCIÓN META-TX (Relayer) ========= **/
export async function crearTransaccion({ contractId, sellerAddress }: { contractId: number; sellerAddress: string }) {
    try {
        console.log(`🔗 Enviando firma meta-tx para contrato #${contractId}`);

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
