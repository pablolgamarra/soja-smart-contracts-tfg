import type { ContratoGranosSoja } from "@blockchain/types/ContratoGranosSoja.ts";
import { blockchainConnection } from "src/blockchain/BlockchainConnection.ts";

/** ========= 📄 OBTENER CONTRATO DESDE BLOCKCHAIN ========= **/
export async function obtenerContratoDesdeBlockchain(idContrato: string) {
    try {
        const data:ContratoGranosSoja.ContratoStruct = await blockchainConnection.contratoView.contratos(idContrato);

        // Adaptamos el resultado del struct a un formato más legible
        return {
            id: idContrato,
            billeteraComprador: data.partes.comprador,
            billeteraVendedor: data.partes.vendedor,
            billeteraBroker: data.partes.broker,
            nombreComprador: data.partes.nombreComprador,
            nombreVendedor: data.partes.nombreVendedor,
            nombreBroker: data.partes.nombreBroker,
            nroFiscalComprador: data.partes.nroIdentidadComprador,
            nroFiscalVendedor: data.partes.nroIdentidadVendedor,
            nroFiscalBroker: data.partes.nroIdentidadBroker,
            // TODO: ESTAS PARTES NO TENGO EN EL CONTRATO BC, PERO DEJO PORSI
            // emailComprador: string;
            // telefonoComprador: string;
            // emailVendedor: string;
            // telefonoVendedor: string;

            // CONDICIONES DEL GRANO
            cantidadToneladas: data.condicionesGrano.cantidadToneladasMetricas,
            tipoGrano: data.condicionesGrano.tipoGrano,
            cosecha: data.condicionesGrano.cosecha,

            // CONDICIONES DE ENTREGA
            empaque: data.condicionesEntrega.empaque,
            fechaEntregaInicio: data.condicionesEntrega.fechaEntregaInicio,
            fechaEntregaFin: data.condicionesEntrega.fechaEntregaFin,

            // CONDICIONES DE PRECIO
            tipoContrato: data.condicionesPrecio.tipoContrato,
            precioPorToneladaMetrica: data.condicionesPrecio.precioPorToneladaMetrica,
            precioCBOTBushel: data.condicionesPrecio.precioCBOTBushel,
            ajusteCBOT: data.condicionesPrecio.ajusteCBOT, // al par=0 / más=1 / menos=-1
            fechaPrecioChicago: data.condicionesPrecio.fechaPrecioChicago,
            incoterm: data.condicionesPrecio.incoterm,
            precioFinal: data.condicionesPrecio.precioFinal,

            // CONDICIONES EMBARQUE
            puertoEmbarque: data.condicionesEmbarque.puertoEmbarque,
            destinoFinal: data.condicionesEmbarque.destinoFinal,

            // CONDICIONES CONTRATO
            hashVersionContrato: data.hashVersionContrato,
            evidenceURI: data.evidenceURI,
            fechaCelebracionContrato: data.fechaCelebracionContrato,
            estado: data.estado,
            clausulasAdicionales: data.clausulasAdicionales,
        };
    } catch (err) {
        console.error("❌ Error obteniendo contrato desde blockchain:", err);
        return null;
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
