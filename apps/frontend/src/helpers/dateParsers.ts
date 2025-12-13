// FUNCIONES PARA PASAR DE MILISEGUNDOS (UNIX TIMESTAMP) A DATE Y VICEVERSA
export function parseUnixSecondsToDate(unixSeconds: string | number | bigint): Date {
    if (!unixSeconds) {
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