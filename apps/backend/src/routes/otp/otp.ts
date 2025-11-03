import { Router } from "express";
import { insertOtp } from "@data/dao/dao.ts";
// import { sendOTPViaWhatsApp } from "../services/whatsapp.js"; // si luego lo integras

const router = Router();

router.post("/generate", async (req, res) => {
    try {
        const { contractId, sellerAddress, phone } = req.body;

        if (!contractId || !sellerAddress) {
            return res.status(400).json({ success: false, message: "Datos incompletos" });
        }

        // Generar OTP de 6 dígitos
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Calcular fecha de expiración (10 minutos)
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

        // Guardar OTP en base de datos
        await insertOtp({ contractId, sellerAddress, otp, expiresAt });

        // Enviar OTP
        // await sendOTPViaWhatsApp(phone, otp);

        console.log(`El OTP generado es: ${otp}`);
        console.log(`OTP generado para ${sellerAddress}`);

        res.json({ success: true, message: "OTP generado y enviado correctamente." });
    } catch (error) {
        console.error("Error generando OTP:", error);
        res.status(500).json({ success: false, message: "Error al generar el OTP." });
    }
});

export default router;
