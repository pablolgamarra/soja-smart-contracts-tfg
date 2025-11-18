import dotenv from "dotenv";

// Convertir cualquier tipo de Big Int a String. Incluso objetos con valores bigInt
export function convertBigIntToString(obj: Object | string | Array<any>): any {
    if (typeof obj === "bigint") {
        return obj.toString();
    }

    if (Array.isArray(obj)) {
        return obj.map(item => convertBigIntToString(item));
    }

    if (typeof obj === "object" && obj !== null) {
        const newObj: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[ key ] = convertBigIntToString(obj[ key ]);
            }
        }
        return newObj;
    }

    return obj;
}

export function getEnv(name:string){
    dotenv.config();
    const envVar = process.env[name];

    if(envVar === undefined || envVar ===null || !envVar){
        throw (`No se ha definido variable de entorno para ${name}`)
    }

    return envVar;
}

export function prepareOtpMail(to: string, otp: string, subject?: string, content?:string) {
    try{
        const from = getEnv("SMTP_AUTH_USER")

        const preparedMail = {
            from: `"SoySmart Notificaciones" < ${ from }> `,
            to,
            subject: subject || "OTP PARA FIRMAR CONTRATO",
            html: content || `
                <h3>🔐 Código de verificación</h3>
                < p > Tu código OTP es: <strong>${ otp } </strong></p >
                <p>Válido por 10 minutos.</p>
            `,
        }
        return preparedMail;    
    }catch(e){
        throw e;
    }
}

export function prepareOtpMessage(otp:string){
    return `🔐 Código de verificación
        Tu código OTP es: *${ otp }*
            Válido por 10 minutos.`
}

// FUNCIONES PARA PASAR DE MILISEGUNDOS (UNIX TIMESTAMP) A DATE Y VICEVERSA
export function parseUnixSecondsToDate(unixSeconds:string | number | bigint): Date {
    if(!unixSeconds){
        throw Error(`Passed data not valid to parse`);
    }

    return new Date(Number(unixSeconds) * 1000);
}

export function parseDateToUnixSeconds(date: Date | string): number {
    if (!date) {
        throw Error(`Passed data not valid to parse`);
    }

    return Math.floor(new Date(date).getTime() / 1000);
}