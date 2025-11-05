import { makePromiseQuery, makePromiseRun } from "../sqlite/index.js";
import { TABLE_NAMES } from "../migrations.js";
import type { OtpRecord } from "src/types/otp.ts";

const t = TABLE_NAMES.OTP_TABLE_NAME;

// Crear nuevo OTP
export async function insertOtp({
    contractId,
    sellerAddress,
    otp,
    expiresAt
}: {
    contractId: string;
    sellerAddress: string;
    otp: string;
    expiresAt: string;
}): Promise<{ success: boolean }> {
    const sql = `
    INSERT INTO ${t} (contractId, sellerAddress, otp, expiresAt, used)
    VALUES (?, ?, ?, ?, 0)
  `;
    await makePromiseRun(sql, [ contractId, sellerAddress, otp, expiresAt ]);
    return { success: true };
}

// Obtener OTP válido por contrato y vendedor
export async function getOtp({
    contractId,
    sellerAddress
}: {
    contractId: string;
    sellerAddress: string;
}): Promise<OtpRecord | null> {
    const sql = `
    SELECT * FROM ${t}
    WHERE contractId = ? AND sellerAddress = ? AND used = 0
      AND datetime(expiresAt) > datetime('now')
    LIMIT 1
  `;
    const rows = await makePromiseQuery<OtpRecord[]>(sql, [ contractId, sellerAddress ]);
    return rows?.[ 0 ][0] as OtpRecord || null;
}

// Marcar OTP como usado
export async function markOtpAsUsed(id: string): Promise<{ success: boolean }> {
    const sql = `UPDATE ${t} SET used = 1 WHERE id = ?`;
    await makePromiseRun(sql, [ id ]);
    return { success: true };
}

// Buscar último OTP emitido
export async function getOtpByContractAndSeller(
    contractId: string,
    sellerAddress: string
): Promise<OtpRecord | null> {
    const sql = `SELECT * FROM ${t} WHERE contractId = ? AND sellerAddress = ? ORDER BY id DESC LIMIT 1`;
    const rows = await makePromiseQuery<OtpRecord[]>(sql, [ contractId, sellerAddress ]);
    return rows?.[ 0 ][ 0 ] as OtpRecord || null;
}

// Eliminar OTPs expirados (opcional)
export async function deleteExpiredOtps(): Promise<{ success: boolean }> {
    const sql = `DELETE FROM ${t} WHERE datetime(expiresAt) <= datetime('now')`;
    await makePromiseRun(sql);
    return { success: true };
}
