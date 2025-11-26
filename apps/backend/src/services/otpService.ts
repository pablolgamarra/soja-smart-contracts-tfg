import { insertOtp, getOtpByContractAndSeller, markOtpAsUsed } from '@data/dao/dao.ts';
import { parseDateToUnixSeconds, parseUnixSecondsToDate } from '@helpers/index.ts';
import { ContratoOnChain } from '@types/Contrato.ts';

class OTPService {

    // Generar OTP y enviarlo
    public async generarOTP(props : Pick<ContratoOnChain, 'id' | 'billeteraVendedor'>): Promise<string> {
        try{
            // Generar OTP de 6 dígitos
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const fechaExpiracion = parseDateToUnixSeconds((Date.now() + 10 * 60 * 1000).toString()); //10 Min.
    
            // Guardar OTP en la base de datos
            await insertOtp({contractId: props.id.toString(), sellerAddress: props.billeteraVendedor, otp:otp, expiresAt:fechaExpiracion.toString()});
    
            return otp;
        } catch (error) {
            throw new Error(`Error al generar OTP -> ${error}`);
        }
    }

    // Verificar OTP
    public async verificarOTP(props: Pick<ContratoOnChain, 'id' | 'billeteraVendedor'>, otp: string): Promise<{ valid: boolean, message?: string }> {
        // Buscar OTP registrado en la base de datos
        const otpRecord = await getOtpByContractAndSeller(props.id.toString(), props.billeteraVendedor);

        if (!otpRecord) {
            return {valid: false, message: 'OTP no encontrado'};
        }

        if (otpRecord.otp !== otp) {
            return { valid: false, message: 'OTP incorrecto' };
        }

        if (parseUnixSecondsToDate(otpRecord.expiresAt) < new Date()) {
            return { valid: false, message: 'OTP expirado' };
        }

        if (otpRecord.used) {
            return { valid: false, message: 'OTP ya utilizado' };
        }

        // Marcar OTP como usado
        await markOtpAsUsed(otpRecord.id.toString());

        return { valid: true }; // Retorna resultado exitoso
    }
}

// Exportar instancia del servicio como singleton
export const otpService = new OTPService();
