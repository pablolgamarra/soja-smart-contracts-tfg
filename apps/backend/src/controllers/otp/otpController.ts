import { NextFunction, Request, Response } from 'express';
import { otpService } from '@services/otpService.ts';
import notificatorService from '@services/notifications/notificationService.ts';
import { getEnv } from '@helpers/index.ts';

const CONFIG = {
    relayer: getEnv("RELAYER_ADDRESS")
}

class OTPController {
    // Crear OTP y enviar notificaciones
    public generarOTP = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { contractId, email, number } = req.body;

            if (!contractId) {
                return res.status(400).json({ success: false, message: "Datos incompletos" });
            }

            const sellerAddress = CONFIG.relayer 

            // Delegar la lógica de negocio a otpService
            const otpCode = await otpService.generarOTP({id: contractId, billeteraVendedor: sellerAddress});
            
            // Enviar OTP por correo y/o WhatsApp
            await notificatorService.sendOTPNotification({email, number}, otpCode);

            return res.json({
                success: true,
                message: "OTP generado",
                data: otpCode
            });
        } catch (e) {
            next(e);
        }
    };

    // Verificar OTP
    public verificarOTP = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { contractId, otp } = req.body;

            const sellerAddress = CONFIG.relayer 

            if (!contractId || !otp) {
                return res.status(400).json({ success: false, message: "Datos incompletos" });
            }

            // Verificar OTP usando servicio
            const checkOtp = await otpService.verificarOTP({ id: contractId, billeteraVendedor: sellerAddress }, otp);

            if (checkOtp.message === 'OTP no encontrado') {
                return res.status(404).json({ success:false, message: "OTP no encontrado" });
            }

            if (checkOtp.message === 'OTP incorrecto') {
                return res.status(401).json({ success: false, message: "OTP incorrecto" });
            }

            if (checkOtp.message === 'OTP expirado') {
                return res.status(410).json({ success: false, message: "OTP expirado" });
            }

            if (checkOtp.message === 'OTP ya utilizado') {
                return res.status(409).json({ success: false, message: "OTP ya utilizado" });
            }

            if (!checkOtp.valid) {
                return res.status(400).json({ success: false, message: "Error verificando OTP" });
            }

            res.json({
                success: true,
                message: "OTP verificado correctamente. El vendedor puede firmar el contrato.",
            });
        } catch (e) {
            next(e);
        }
    }
}

export default new OTPController();
