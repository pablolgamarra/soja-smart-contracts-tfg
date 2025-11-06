import { insertOtp, getOtpByContractAndSeller, markOtpAsUsed } from '@data/dao/dao.ts';

class OTPService {

    // Generar OTP y enviarlo
    public async generarOTP(contractId: string, sellerAddress: string) {
        // Generar OTP de 6 dígitos
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

        // Guardar OTP en la base de datos
        await insertOtp({ contractId, sellerAddress, otp, expiresAt });

        return { otp }; // Retorna el OTP generado si es necesario
    }

    // Verificar OTP
    public async verificarOTP(contractId: string, sellerAddress: string, otp: string) {
        // Buscar OTP registrado en la base de datos
        const otpRecord = await getOtpByContractAndSeller(contractId, sellerAddress);

        if (!otpRecord) {
            throw new Error('OTP no encontrado');
        }

        if (otpRecord.otp !== otp) {
            throw new Error('OTP incorrecto');
        }

        if (new Date(otpRecord.expiresAt) < new Date()) {
            throw new Error('OTP expirado');
        }

        if (otpRecord.used) {
            throw new Error('OTP ya utilizado');
        }

        // Marcar OTP como usado
        await markOtpAsUsed(otpRecord.id.toString());

        return { success: true }; // Retorna resultado exitoso
    }
}

// Exportar instancia del servicio como singleton
export const otpService = new OTPService();
