// src/types/global.d.ts

// Importa los tipos del Provider para mayor precisión
import { Eip1193Provider } from "ethers";

// Declaración de módulos y tipos globales para Web3
declare global {
    interface Window {
        // La propiedad 'ethereum' se inyecta por MetaMask y otros wallets.
        // Ethers.js v6+ recomienda usar el tipo Eip1193Provider para el proveedor.
        ethereum?: Eip1193Provider & {
            // MetaMask añade métodos de escucha como 'on' y 'removeListener'
            on: (event: string, callback: (...args: any[]) => void) => void;
            removeListener: (event: string, callback: (...args: any[]) => void) => void;
        };

        // Si planeas usar otras extensiones de wallet (ej. Coinbase), se añadirían aquí.
        // web3?: any; // Tipado antiguo, generalmente evitado.
    }
}

// Esto asegura que TypeScript reconozca esta declaración como global.
export {};