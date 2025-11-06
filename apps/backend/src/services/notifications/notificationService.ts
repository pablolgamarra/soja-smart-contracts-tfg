import { EmailSMTPSender } from "@services/notifications/email-smtp/EmailSMTPSender.ts";
import { WhatsappWebhookSender } from "@services/notifications/whatsapp-webhooks/WhatsappWebhookSender.ts";
import { IEmailNotificator } from "src/interfaces/IEmailNotificator.ts";
import { IMessageNotificator } from "src/interfaces/IMessageNotificator.ts";

export class NotificationService {
    emailSender:IEmailNotificator;
    whatsappSender?:IMessageNotificator;
    
    constructor(emailSender:IEmailNotificator, whatsappSender?:IMessageNotificator){
        this.emailSender = emailSender;
        this.whatsappSender = whatsappSender;
    }
    
    sendOTPNotification = async (to:string, otp:string, messageContent?:string) => {
        try{
            this.emailSender.sendOTPEmail(to, otp, messageContent);
            this.whatsappSender?.sendOTPMessage(to, otp);       
        }catch(e){
            console.error(`Error enviando otp`);
            throw (`Error enviando otp -> ${e}`);
        }
    }
}


// OBJETO SINGLETON (PARA INICIALIZAR UNA SOLA VEZ A LO LARGO DEL CICLO DE VIDA DE LA APP)

const emailSender = new EmailSMTPSender();
const whatsappSender = new WhatsappWebhookSender();

const notificatorService = new NotificationService(emailSender, whatsappSender);

export default notificatorService;