export interface IMessageNotificator{
    sendOTPMessage: (to: string, otp: string, message?: string) => void;
} 