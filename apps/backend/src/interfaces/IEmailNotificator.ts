export interface IEmailNotificator {
    sendOTPEmail: (to: string, otp: string, mailContent?: string) => void;
}