import { Request, Response } from 'express';
import { otpService } from '@services/otpService.ts';
import notificatorService from '@services/notifications/notificationService.ts';
import { getEnv } from '@helpers/index.ts';

const CONFIG = {
    relayer: getEnv("RELAYER_ADDRESS")
}

class OTPController {
    // Crear OTP
    public generarOTP = async (req: Request, res: Response) => {
        const { contractId, email, number } = req.body;

        if (!contractId) {
            return res.status(400).json({ success: false, message: "Datos incompletos" });
        }

        try {
            const sellerAddress = CONFIG.relayer 

            // Delegar la lógica de negocio a otpService
            const otpResult = await otpService.generarOTP(contractId, sellerAddress);
            
            // Enviar OTP por correo y/o WhatsApp
            await notificatorService.sendOTPNotification({email, number}, otpResult.otp);

            res.json({
                success: true,
                message: "OTP generado.",
                otp: otpResult.otp, // opcional, si quieres enviar el OTP generado
            });
        } catch (error) {
            console.error("❌ Error generando OTP:", error);
            res.status(500).json({ success: false, message: "Error al generar y enviar el OTP." });
        }
    };

    // Verificar OTP
    public verificarOTP = async (req: Request, res: Response) => {
        const { contractId, otp } = req.body;

        const sellerAddress = CONFIG.relayer 

        if (!contractId || !otp) {
            return res.status(400).json({ success: false, message: "Datos incompletos" });
        }

        try {
            // Delegar la lógica de verificación de OTP a otpService
            const verificationResult = await otpService.verificarOTP(contractId, sellerAddress, otp);

            res.json({
                success: true,
                message: "OTP verificado correctamente. El vendedor puede firmar el contrato.",
            });
        } catch (error) {
            console.error("❌ Error verificando OTP:", error);
            res.status(500).json({ success: false, message: "Error al verificar el OTP." });
        }
    }
}

export default new OTPController();
