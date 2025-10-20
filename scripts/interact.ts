import { ethers } from "ethers";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dirección del contrato (de la consola del nodo)
const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

// Carga la ABI del contrato
const abi = JSON.parse(
    fs.readFileSync("./artifacts/contracts/ContratoSoja.sol/ContratoGranosSoja.json", "utf8")
).abi;

async function main() {
    // 1️⃣ Conectarse al nodo local
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    // 2️⃣ Obtener cuentas locales
    const [ comprador, vendedor ] = await Promise.all([
        provider.getSigner(0), // comprador
        provider.getSigner(1), // vendedor
    ]);

    // 3️⃣ Crear la instancia del contrato
    const contrato = new ethers.Contract(CONTRACT_ADDRESS, abi, comprador);

    console.log("Contrato conectado en:", await contrato.getAddress());

    // 4️⃣ Crear un contrato comercial de prueba
    const identificadorPartes = {
        comprador: await comprador.getAddress(),
        vendedor: await vendedor.getAddress(),
        intermediario: ethers.ZeroAddress,
    };

    const condicionesComerciales = {
        incoterm: "FOB",
        fleteACargoDe: "Comprador",
        puntoControlCalidad: "Puerto Origen",
        cantidadToneladas: 10,
        precioPorTonelada: 500,
        tipoContrato: 0, // 0 = PrecioFijo
        fechaEntrega: Math.floor(Date.now() / 1000) + 86400 * 30,
        lugarEntrega: "Puerto de CDE",
        condicionesCalidad: "Humedad < 13%",
    };

    const tx = await contrato.crearContrato(
        identificadorPartes,
        condicionesComerciales,
        "Contado", // modalidadPago
        0,         // accionIncumplimiento (Rechazo)
        5,         // porcentajeDescuento
        await comprador.getAddress(), // arbitro
        "hash-demo-001"               // hashVersionContrato
    );

    console.log("Transacción enviada:", tx.hash);
    await tx.wait();
    console.log("Contrato creado exitosamente.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
