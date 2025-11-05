import { contratoRelayer as contrato } from "src/blockchain/index.ts";

/** ========= 📄 OBTENER CONTRATO DESDE BLOCKCHAIN ========= **/
export async function obtenerContratoDesdeBlockchain(idContrato: string) {
    try {
        const data = await contrato.contratos(idContrato);

        // Adaptamos el resultado del struct a un formato más legible
        return {
            comprador: data.identificadorPartes.comprador,
            vendedor: data.identificadorPartes.vendedor,
            intermediario: data.identificadorPartes.intermediario,
            tipoProducto: data.tipoProducto,
            condicionesComerciales: {
                incoterm: data.condicionesComerciales.incoterm,
                fleteACargoDe: data.condicionesComerciales.fleteACargoDe,
                puntoControlCalidad: data.condicionesComerciales.puntoControlCalidad,
                cantidadToneladas: data.condicionesComerciales.cantidadToneladas.toString(),
                precioPorTonelada: data.condicionesComerciales.precioPorTonelada.toString(),
                fechaEntrega: data.condicionesComerciales.fechaEntrega.toString(),
                lugarEntrega: data.condicionesComerciales.lugarEntrega,
                condicionesCalidad: data.condicionesComerciales.condicionesCalidad,
            },
            condicionesEconomicas: {
                modalidadPago: data.condicionesEconomicas.modalidadPago,
                montoTotal: data.condicionesEconomicas.montoTotal.toString(),
            },
            penalizacionIncumplimiento: {
                accionIncumplimiento: data.penalizacionIncumplimiento.accionIncumplimiento,
                porcentajeDescuento: data.penalizacionIncumplimiento.porcentajeDescuento.toString(),
                arbitro: data.penalizacionIncumplimiento.arbitro,
            },
            estado: Number(data.estado),
            hashVersionContrato: data.hashVersionContrato,
            evidenceURI: data.evidenceURI,
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
        const tx = await contrato.firmarContratoMetaTx(
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
