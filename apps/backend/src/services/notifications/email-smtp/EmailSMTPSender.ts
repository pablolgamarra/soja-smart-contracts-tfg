import nodemailer, { TransportOptions, type Transporter} from "nodemailer";
import dotenv from "dotenv";
import { getEnv, prepareOtpMail } from "src/helpers/index.ts";
import { IEmailNotificator } from "src/interfaces/IEmailNotificator.ts";

dotenv.config();

const CONFIGS = {
    HOST: getEnv("SMTP_HOST"),
    PORT: getEnv("SMTP_PORT"),
    SECURE: getEnv("SMTP_SECURE"),
    AUTH:{
        USER: getEnv("SMTP_AUTH_USER"),
        PASS: getEnv("SMTP_AUTH_PASS")
    }
};

export class EmailSMTPSender implements IEmailNotificator {
    transporter: Transporter | undefined;

    constructor (){
        try {
            this.transporter = nodemailer.createTransport({
                service: "Outlook365",
                auth: {
                    type: 'LOGIN',
                    user: CONFIGS.AUTH.USER,
                    pass: CONFIGS.AUTH.PASS,
                },
            } as TransportOptions);
            this.verifyTransporter();
        } catch (e) {
            console.error(`Error al configurar nodemailer. -> ${e}`);
        }
    }

    async verifyTransporter() {
        try {
            await this.transporter?.verify();
            console.log(`Transporter de nodemailer configurado correctamente`);
        } catch (e) {
            console.error(`Error configurando transporter de nodemailer -> ${e}`);
        }
    }

    async sendOTPEmail(to: string, otp: string, mailContent?: string) {
        const preparedMail = prepareOtpMail(to, otp, mailContent);

        try {
            await this.transporter?.sendMail(preparedMail);

            console.log(`OTP enviado por correo a ${to}`);
        } catch (e) {
            console.error(`Error enviando correo OTP -> ${e}`);
        }
    }
}