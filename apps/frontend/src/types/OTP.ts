export interface OTP {
    id: string;
    codigo: string;
    expiraEn: string;
    idContrato: string;
    usado: boolean;   // Indica si el OTP ya ha sido usado
}