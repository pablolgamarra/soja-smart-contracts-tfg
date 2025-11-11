import getEnv from "@helpers/getEnv";

const CONFIG = {
    BACKEND_HOST: getEnv("BACKEND_HOST"),
    BACKEND_PORT: getEnv("BACKEND_PORT"),
};

class OtpAPI {
    async validarOTP(idContrato: string, codigoOtp: string) {
        try {
            const response = await fetch(
                `${CONFIG.BACKEND_HOST}:${CONFIG.BACKEND_PORT}/otp/verify`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contractId: idContrato,
                        otp: codigoOtp,
                    }),
                }
            );

            const data = await response.json();
            return { success: response.ok, ...data };
        } catch (error) {
            console.error("Error enviando la solicitud de OTP:", error);
            return { success: false, message: "Error de red o servidor no disponible" };
        }
    }
}

export default new OtpAPI();