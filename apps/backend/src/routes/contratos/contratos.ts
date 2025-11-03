import {Router} from 'express';
import {crearTransaccion} from '@services/relayerServices.ts'
import { getOtpByContractAndSeller, markOtpAsUsed } from '@data/dao/dao.ts';

const router = Router();

router.post("/firmar", async (req, res) => {
    try {
        const { contractId, sellerAddress, otp } = req.body;

        if (!contractId || !sellerAddress || !otp) {
            return res.status(400).json({ error: "Datos incompletos" });
        }

        // Buscar OTP válido en base
        const otpRecord = await getOtpByContractAndSeller(contractId, sellerAddress);

        if (!otpRecord) {
            return res.status(404).json({ error: "OTP no encontrado" });
        }

        // Validar coincidencia
        if (otpRecord.otp !== otp) {
            return res.status(401).json({ error: "OTP incorrecto" });
        }

        // Validar expiración
        if (new Date(otpRecord.expiresAt) < new Date()) {
            return res.status(410).json({ error: "OTP expirado" });
        }

        // Validar si ya fue usado
        if (otpRecord.used) {
            return res.status(409).json({ error: "OTP ya utilizado" });
        }

        // Marcar OTP como usado
        await markOtpAsUsed(otpRecord.id);

        // Ejecutar la transacción en blockchain
        const tx = await crearTransaccion({ contractId, sellerAddress });

        res.json({
            success: true,
            message: "Contrato firmado correctamente.",
            txHash: tx.hash,
        });
    } catch (e) {
        console.error("Error firmando contrato:", e);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;