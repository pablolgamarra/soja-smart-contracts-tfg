import getEnv from "@helpers/getEnv.ts";
import type { Contrato } from "@types/Contrato"; // Asegúrate de que este tipo esté bien definido

const CONFIG = {
    BACKEND_HOST: getEnv("BACKEND_HOST"),
};

class ContratosAPI {
    // Esta función ahora solo se encargará de enviar la solicitud para generar OTP
    async generarOTP(contractId: string, sellerAddress: string, email: string) {
        try {
            const response = await fetch(`${CONFIG.BACKEND_HOST}/otp/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contractId,
                    sellerAddress,
                    email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('OTP generado correctamente:', data);
            } else {
                console.error('Error generando OTP:', data);
            }
        } catch (e) {
            console.error('Error enviando la solicitud de OTP:', e);
        }
    }

    // Si en el futuro se decide tener una función para manejar más aspectos de los contratos, la mantienes aquí.
    async registrarContrato(data: Contrato) {
        try {
            const response = await fetch(`${CONFIG.BACKEND_HOST}/contratos`, {
                method: 'POST',
                body: JSON.stringify({
                    message: data,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Contrato registrado exitosamente:', result);
            } else {
                console.error('Error registrando contrato:', result);
            }
        } catch (e) {
            console.error('Error registrando contrato:', e);
        }
    }
}

export default new ContratosAPI();
