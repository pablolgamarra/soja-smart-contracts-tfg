import db, { makePromiseQuery, makePromiseRun } from "../sqlite/index.js";
import { TABLE_NAMES } from "../migrations.js";

const t = TABLE_NAMES.OTP_TABLE_NAME;

// Crear nuevo OTP
export async function insertOtp({ contractId, sellerAddress, otp, expiresAt }: { contractId: string, sellerAddress: string, otp: string, expiresAt:string}) {
    const sql = `
    INSERT INTO ${t} (contractId, sellerAddress, otp, expiresAt, used)
    VALUES (?, ?, ?, ?, 0)
  `;
    await makePromiseRun(sql, [ contractId, sellerAddress, otp, expiresAt ]);
    return { success: true };
}

// Obtener OTP válido por contrato y vendedor
export async function getOtp({ contractId, sellerAddress }: { contractId: string, sellerAddress: string}) {
    const sql = `
    SELECT * FROM ${t}
    WHERE contractId = ? AND sellerAddress = ? AND used = 0
      AND datetime(expiresAt) > datetime('now')
    LIMIT 1
  `;
    const rows = await makePromiseQuery(sql, [ contractId, sellerAddress ]);
    return (rows as unknown)?.[ 0 ] || null;
}

// Marcar OTP como usado
export async function markOtpAsUsed(id:string) {
    const sql = `UPDATE ${t} SET used = 1 WHERE id = ?`;
    await makePromiseRun(sql, [ id ]);
    return { success: true };
}

export async function getOtpByContractAndSeller(contractId: string, sellerAddress:string) {
    const sql = `SELECT * FROM ${t} WHERE contractId = ? AND sellerAddress = ? ORDER BY id DESC LIMIT 1`;
    const rows = await makePromiseQuery(sql, [ contractId, sellerAddress ]);
    return (rows as unknown)?.[ 0 ] || null;
}

// Eliminar OTPs expirados (opcional)
export async function deleteExpiredOtps() {
    const sql = `DELETE FROM ${t} WHERE datetime(expiresAt) <= datetime('now')`;
    await makePromiseRun(sql);
    return { success: true };
}
