export interface OtpRecord {
    id: number;
    contractId: string;
    sellerAddress: string;
    otp: string;
    expiresAt: string;   // ISO string
    used: 0 | 1;
    createdAt?: string;
}
