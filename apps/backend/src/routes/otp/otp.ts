import { Router } from "express";
import { insertOtp, getOtpByContractAndSeller, markOtpAsUsed } from "@data/dao/dao.ts";
import {sendOTPEmail} from "@services/sendOtp.ts";

const router = Router();

/**
 * 🟢 POST /otp/generate
 * Genera un OTP y lo envía al vendedor (WhatsApp o correo).
 * Endpoint usado por el comprador cuando crea un contrato.
 */
router.post("/generate", async (req, res) => {
    try {
        const { contractId, sellerAddress, email } = req.body;

        if (!contractId || !sellerAddress) {
            return res.status(400).json({ success: false, message: "Datos incompletos" });
        }

        // 🔢 Generar OTP de 6 dígitos
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // ⏳ Expira en 10 minutos
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

        // Guardar OTP en la base de datos
        await insertOtp({ contractId, sellerAddress, otp, expiresAt });

        // Si luego integras un servicio de mensajería, podrías enviar el OTP:
        // await sendOTPViaWhatsApp(phone, otp);
        await sendOTPEmail(email, otp);

        console.log(`✅ OTP generado: ${otp} (Contrato ${contractId}, Vendedor ${sellerAddress})`);

        res.json({ success: true, message: "OTP generado y enviado correctamente." });
    } catch (error) {
        console.error("❌ Error generando OTP:", error);
        res.status(500).json({ success: false, message: "Error al generar el OTP." });
    }
});

/**
 * 🟡 POST /otp/verify
 * Verifica que un OTP ingresado por el vendedor sea válido.
 * (Se ejecuta antes de firmar el contrato)
 */
router.post("/verify", async (req, res) => {
    try {
        const { contractId, sellerAddress, otp } = req.body;

        if (!contractId || !sellerAddress || !otp) {
            return res.status(400).json({ success: false, message: "Datos incompletos" });
        }

        // Buscar OTP registrado
        const otpRecord = await getOtpByContractAndSeller(contractId, sellerAddress);

        if (!otpRecord) {
            return res.status(404).json({ success: false, message: "OTP no encontrado" });
        }

        // Validar coincidencia
        if (otpRecord.otp !== otp) {
            return res.status(401).json({ success: false, message: "OTP incorrecto" });
        }

        // Validar expiración
        if (new Date(otpRecord.expiresAt) < new Date()) {
            return res.status(410).json({ success: false, message: "OTP expirado" });
        }

        // Validar si ya fue usado
        if (otpRecord.used) {
            return res.status(409).json({ success: false, message: "OTP ya utilizado" });
        }

        // Marcar OTP como usado (ya validado)
        await markOtpAsUsed(otpRecord.id.toString());

        res.json({
            success: true,
            message: "OTP verificado correctamente. El vendedor puede firmar el contrato.",
        });
    } catch (error) {
        console.error("❌ Error verificando OTP:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
});

export default router;
