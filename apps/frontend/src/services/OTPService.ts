import getEnv from "@helpers/getEnv.ts";
import type { Contrato } from "@types/Contrato";

const CONFIG = {
    BACKEND_HOST: getEnv("BACKEND_HOSTNAME"),
    BACKEND_PORT: getEnv("BACKEND_PORT"),
};

class OTPService {
    public async generarOtpContrato(contrato: Contrato) {
        try{
            const {id,emailVendedor, telefonoVendedor} = contrato;
            const response = await fetch(`http://${CONFIG.BACKEND_HOST}:${CONFIG.BACKEND_PORT}/otp/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "contractId": id,
                    "email": emailVendedor,
                    "number": telefonoVendedor
                }),
            });

            const data = await response.json();

            if(data.success) {
                return true;
            } else {
                throw Error(data.message);
            }
        } catch(e){
            throw Error(`Error generando OTP -> ${e}`)
        }
    }
    
    public async validarOtpContrato(contrato:Contrato, otp:string):Promise<boolean> {
        try {
            const {id} = contrato;

            const response = await fetch(`http://${CONFIG.BACKEND_HOST}:${CONFIG.BACKEND_PORT}/otp/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "contractId": id, 
                    "otp": otp 
                }),
            });

            const data = await response.json();

            if (data.success) {
                return true;
            } else {
                throw Error(data.message);
            }
        } catch (e) {
            throw Error(`Error verificando OTP -> ${e}`)
        }
    }
}

export default new OTPService();
