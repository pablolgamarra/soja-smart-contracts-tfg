// Convertir cualquier tipo de Big Int a String. Incluso objetos con valores bigInt
export function convertBigIntToString(obj: any): any {
    if (typeof obj === "bigint") {
        return obj.toString();
    }

    if (Array.isArray(obj)) {
        return obj.map(item => convertBigIntToString(item));
    }

    if (typeof obj === "object" && obj !== null) {
        const newObj: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[ key ] = convertBigIntToString(obj[ key ]);
            }
        }
        return newObj;
    }

    return obj;
}