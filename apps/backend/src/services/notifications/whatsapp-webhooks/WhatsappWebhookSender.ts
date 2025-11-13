import { getEnv, prepareOtpMessage } from "src/helpers/index.ts";
import { IMessageNotificator } from "src/interfaces/IMessageNotificator.ts";

const CONFIGS = {
    HOST: getEnv("WHAP_CONTAINER_NAME"),
    PORT: getEnv("WHAP_CONTAINER_PORT"),
    ENDPOINT: getEnv("WHAP_CONTAINER_WEBHOOK_ENDPOINT"),
}

export class WhatsappWebhookSender implements IMessageNotificator {
    webhookListener:string | undefined;

    constructor(){
        try{
            this.webhookListener = `http://${CONFIGS.HOST}:${CONFIGS.PORT}/${CONFIGS.ENDPOINT}`
        }catch(e){
            console.error(`Error al configurar whatsapp notification sender. -> ${e}`);
        }
    }

    async sendOTPMessage (to:string, otp: string){
        const message = prepareOtpMessage(otp);

        try {
            if(!this.webhookListener){
                throw Error(`URL del Webhook para whatsapp no encontrada`);
            }

            const chatId = `${to}@c.us`
            const messageSended = await fetch(this.webhookListener, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ 
                    'message': message,
                    "recipients": [
                        {
                            "chatId": chatId,
                            "name": "Recipient"
                        }
                    ]
                })
            })

            if(messageSended.status !== 200 || !(messageSended.ok)){
                throw Error(`Error al enviar notificacion -> CODE: ${messageSended.status}. MESSAGE: ${messageSended.json().then((e)=>{console.log(e)})}`)
            }
            
            console.log(`OTP enviado por Whatsapp`);
        } catch (e) {
            console.error(`Fallo en envío de notificación por Whatsapp -> ${e}`);
        }
    }
}