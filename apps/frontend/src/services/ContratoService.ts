// import type { Web3ContextType } from "@context/Web3Context";
// import getEnv from "@helpers/getEnv.ts";
// import { type Contrato } from "@types/Contrato"; // Asegúrate de que este tipo esté bien definido
// import { ethers } from "ethers";

// const CONFIG = {
//     BACKEND_HOST: getEnv("BACKEND_HOSTNAME"),
//     BACKEND_PORT: getEnv("BACKEND_PORT"),
// };
// // @services/ContratoService.ts

// // Helper para convertir fechas
// const convertDateToTimestamp = (dateString: string | undefined | null) => {
//     if (!dateString) {
//         // Si no hay fecha, usa la actual (o BigInt(0) si el contrato no acepta 0)
//         return BigInt(Math.floor(Date.now() / 1000));
//     }
//     // Asegurarse de que el parseo de la fecha sea correcto
//     return BigInt(Math.floor(new Date(dateString).getTime() / 1000));
// };

// class ContratoService {
//     public async crearContrato(contrato: Partial<Contrato>, web3Context: Web3ContextType) {
//         try {
//             const { deployedContract, signer, isConnected } = web3Context;

//             // 1. Pre-validación de Contexto Web3
//             if (!isConnected) throw new Error("Wallet no conectada.");
//             if (!deployedContract || !signer) throw new Error("Contrato o signer no inicializado.");

//             // 2. Pre-validación de Datos Críticos
//             if (!contrato.emailVendedor && !contrato.telefonoVendedor) {
//                 throw new Error("Se requieren métodos de notificación para enviar OTP al vendedor.");
//             }

//             // Usamos la dirección del firmante como el comprador registrado en el contrato
//             const buyerAddress = await signer.getAddress();

//             // 3. Mapeo de datos para el Smart Contract (usando BigInt para números)
//             const partes = {
//                 comprador: buyerAddress,
//                 nroIdentidadComprador: contrato.nroFiscalComprador || "",
//                 nombreComprador: contrato.nombreComprador || "",
//                 vendedor: contrato.billeteraVendedor || ethers.ZeroAddress,
//                 nroIdentidadVendedor: contrato.nroFiscalVendedor || "",
//                 nombreVendedor: contrato.nombreVendedor || "",
//                 broker: contrato.billeteraBroker || ethers.ZeroAddress,
//                 nroIdentidadBroker: contrato.nroFiscalBroker || "",
//                 nombreBroker: contrato.nombreBroker || "",
//             };

//             const condicionesGrano = {
//                 cantidadToneladasMetricas: BigInt(contrato.cantidadToneladas || 0),
//                 tipoGrano: contrato.tipoGrano || "",
//                 cosecha: contrato.cosecha || "",
//             };

//             const condicionesEntrega = {
//                 empaque: contrato.empaque || "",
//                 fechaEntregaInicio: convertDateToTimestamp(contrato.fechaEntregaInicio),
//                 fechaEntregaFin: convertDateToTimestamp(contrato.fechaEntregaFin),
//             };

//             const condicionesPrecio = {
//                 // Asumiendo que TipoContrato tiene valores 0, 1...
//                 tipoContrato: BigInt((contrato.tipoContrato?.toString().split(' ').reduce((string1, string2) => string1.concat(string2)) === "PrecioFijo" ? 0 : 1) || 0),
//                 precioPorToneladaMetrica: BigInt(contrato.precioPorToneladaMetrica || 0),
//                 precioCBOTBushel: BigInt(contrato.precioCBOTBushel || 0),
//                 ajusteCBOT: BigInt(contrato.ajusteCBOT || 0),
//                 fechaPrecioChicago: convertDateToTimestamp(contrato.fechaPrecioChicago),
//                 incoterm: contrato.incoterm || "",
//                 precioFinal: BigInt(contrato.precioFinal || 0),
//             };

//             const condicionesEmbarque = {
//                 puertoEmbarque: contrato.puertoEmbarque || "",
//                 destinoFinal: contrato.destinoFinal || "",
//             };

//             // Mapeo de clausulas: Asumir que la interfaz Contrato usa 'textoClausula'
//             const clausulasMapeadas = (contrato.clausulasAdicionales || []).map(c => ({
//                 textoClausula: (c as any).clausula || c.cla, // Mapeo temporal si el form usa 'clausula'
//                 CID: c.CID,
//             }));

//             const contratoSend = {
//                 partes,
//                 condicionesGrano,
//                 condicionesEntrega,
//                 condicionesPrecio,
//                 condicionesEmbarque,
//                 hashVersionContrato: contrato.hashVersionContrato || "hashVersionContrato_v1",
//                 evidenceURI: contrato.evidenceURI || "",
//                 fechaCelebracionContrato: BigInt(Math.floor(Date.now() / 1000)),
//                 estado: BigInt(contrato.estado || 1), // 1 = Creado, Pendiente de Firma
//                 clausulasAdicionales: clausulasMapeadas.length > 0 ? clausulasMapeadas : [ { textoClausula: "", CID: "" } ]
//             };

//             console.log("🧾 Enviando transacción para crear contrato...");

//             // 4. Llamada al Smart Contract
//             const tx = await deployedContract
//                 .connect(signer)
//                 .crearContrato(contratoSend);

//             const receipt = await tx.wait();

//             // 5. Obtener ID del Contrato (asumiendo que 'contadorContratos' es la forma de obtener el último ID)
//             const contractId = await deployedContract.contadorContratos();

//             return {
//                 success: true,
//                 contractId: contractId.toString(),
//                 txHash: receipt.transactionHash,
//                 message: "Contrato creado con éxito."
//             };
//         } catch (err: any) {
//             console.error("Error detallado en ContratoService.crearContrato:", err);
//             // Propagar el error de forma limpia para que el componente lo maneje
//             throw new Error(`Error al crear contrato: ${err.message || err.reason || JSON.stringify(err)}`);
//         }
//     }

//     public async obtenerPorId(id: string) {
//         try {
//             const response = await fetch(`http://${CONFIG.BACKEND_HOST}:${CONFIG.BACKEND_PORT}/contratos/${id.toString()}`, {
//                 method: "GET",
//             });

//             const data = await response.json();

//             if (data.success) {
//                 return data.contrato;
//             } else {
//                 throw Error(data.message);
//             }
//         } catch (e) {
//             throw Error(`Error obteniendo contrato por Id -> ${e}`)
//         }
//     }

//     public async obtenerEventos(contrato: Contrato) {
//         try {
//             const { id } = contrato;
//             const response = await fetch(`http://${CONFIG.BACKEND_HOST}:${CONFIG.BACKEND_PORT}/contratos/${id.toString()}`, {
//                 method: "GET",
//             });

//             const data = await response.json();

//             if (data.success) {
//                 return data.eventos;
//             } else {
//                 throw Error(data.message);
//             }
//         } catch (e) {
//             console.error('Error obteniendo contrato por ID:', e);
//         }
//     }

//     public async firmar(contrato: Contrato, codigo: string) {
//         try {
//             const { id } = contrato;

//             const response = await fetch(`http://${CONFIG.BACKEND_HOST}:${CONFIG.BACKEND_PORT}/contratos/firmar`, {
//                 method: "POST",
//                 headers: { 'Content-type': 'application/json' },
//                 body: JSON.stringify({
//                     "contractId": id,
//                     "otp": codigo
//                 })
//             });

//             const data = await response.json();

//             if (data.success) {
//                 return { success: data.success, message: data.message, txHash: data.txHash };
//             } else {
//                 throw Error(data.message);
//             }
//         } catch (e) {
//             console.error('Error firmando contrato:', e);
//             throw Error(`Error firmando contrato -> , ${e}`);
//         }
//     }
// }

// export default new ContratoService();

import type { Web3ContextType } from "@context/Web3Context";
import getEnv from "@helpers/getEnv.ts";
import type { Contrato } from "@types/Contrato"; // Asegúrate de que este tipo esté bien definido
import { ethers } from "ethers";

const CONFIG = {
    BACKEND_HOST: getEnv("BACKEND_HOSTNAME"),
    BACKEND_PORT: getEnv("BACKEND_PORT"),
};

class ContratoService {
    public async crearContrato(contrato: Partial<Contrato>, web3Context: Web3ContextType) {
        try {
            const { deployedContract, signer, isConnected } = web3Context;

            if (!isConnected) {
                throw new Error("Por favor, conecte su wallet antes de continuar.");
            }

            if (!deployedContract || !signer) {
                throw new Error("Contrato o signer no inicializado.");
            }

            if (!contrato.emailVendedor && !contrato.telefonoVendedor) {
                throw new Error("Se deben establecer metodos de notificacion al vendedor para enviar OTP");
            }

            // Preparando datos para enviar
            const partes = {
                comprador: await signer.getAddress(),
                nroIdentidadComprador: contrato.nroFiscalComprador,
                nombreComprador: contrato.nombreComprador,
                vendedor: contrato.billeteraVendedor,
                nroIdentidadVendedor: contrato.nroFiscalVendedor,
                nombreVendedor: contrato.nombreVendedor,
                broker: contrato.billeteraBroker || ethers.ZeroAddress, // Agregado manejo de broker opcional
                nroIdentidadBroker: contrato.nroFiscalBroker || "",
                nombreBroker: contrato.nombreBroker || "",
            };

            const condicionesGrano = {
                cantidadToneladasMetricas: contrato.cantidadToneladas || 0,
                tipoGrano: contrato.tipoGrano || "Soja",
                cosecha: contrato.cosecha || "2025",
            };

            const condicionesEntrega = {
                empaque: contrato.empaque || "A Granel", // Ajustado por si está vacío
                fechaEntregaInicio: Math.floor(new Date(contrato.fechaEntregaInicio || Date.now()).getTime() / 1000),
                fechaEntregaFin: Math.floor(new Date(contrato.fechaEntregaFin || Date.now() + 60 * 60 * 24 * 30 * 1000).getTime() / 1000), // Fecha de 30 días por defecto
            };

            const condicionesPrecio = {
                tipoContrato: contrato.tipoContrato?.toString().split(' ').reduce((string1, string2) => string1.concat(string2)) === "PrecioFijo" ? 0 : 1,
                precioPorToneladaMetrica: contrato.precioPorToneladaMetrica || 0,
                precioCBOTBushel: contrato.precioCBOTBushel || 0,
                ajusteCBOT: contrato.ajusteCBOT || 0, // Al par=0 / más=1 / menos=-1
                fechaPrecioChicago: Math.floor(new Date(contrato.fechaPrecioChicago?.toString() || Date.now()).getTime() / 1000),
                incoterm: contrato.incoterm || "FOB",
                precioFinal: contrato.precioFinal || 0,
            };

            const condicionesEmbarque = {
                puertoEmbarque: contrato.puertoEmbarque || "Puerto Rosario",
                destinoFinal: contrato.destinoFinal || "CDE",
            };

            // El contrato es el objeto final que se pasa al contrato
            const contratoSend = {
                partes,
                condicionesGrano,
                condicionesEntrega,
                condicionesPrecio,
                condicionesEmbarque,
                hashVersionContrato: "hashVersionContrato_v1", // Puede ser dinámico si lo necesitas
                evidenceURI: contrato.evidenceURI || "localhost",
                fechaCelebracionContrato: Math.floor(new Date(Date.now()).getTime() / 1000),
                estado: 2,
                clausulasAdicionales: contrato.clausulasAdicionales || [ {
                    textoClausula: "",
                    CID: ""
                } ]
            };

            console.log("🧾 Enviando transacción para crear contrato...");

            console.log(contratoSend);

            // Llamada al contrato para crear
            const tx = await deployedContract
                .connect(signer)
                .crearContrato(contratoSend);

            // Esperar a que la transacción se confirme
            const receipt = await tx.wait();

            // Obtener el ID del contrato creado (usualmente es el contador de contratos en el mapping)
            const contractId = await deployedContract.contadorContratos();

            console.log(`✅ Contrato creado con ID: ${contractId.toString()}`);
            console.log(`✅ TX Hash: ${receipt.transactionHash}`);
            console.log("📦 TX confirmada:", receipt.transactionHash);

            alert("✅ Contrato creado con éxito. Enviando OTP al vendedor");

            return {
                success: true, contractId: contractId.toString(), message: "Contrato creado con éxito."
            };
        } catch (err) {
            throw Error(`Error al crear contrato -> ${err}`);
        }
    }

    public async obtenerPorId(id: string) {
        try {
            const response = await fetch(`http://${CONFIG.BACKEND_HOST}:${CONFIG.BACKEND_PORT}/contratos/${id.toString()}`, {
                method: "GET",
            });

            // console.log('Respuesta al obtener por ID:', await response.json());

            const data = await response.json();

            if (data.success) {
                return data.data;
            } else {
                throw Error(data.message);
            }
        } catch (e) {
            throw Error(`Error obteniendo contrato por Id -> ${e}`)
        }
    }

    public async obtenerEventos(contrato: Contrato) {
        try {
            const { id } = contrato;
            const response = await fetch(`http://${CONFIG.BACKEND_HOST}:${CONFIG.BACKEND_PORT}/contratos/${id.toString()}`, {
                method: "GET",
            });

            const data = await response.json();

            if (data.success) {
                return data.eventos;
            } else {
                throw Error(data.message);
            }
        } catch (e) {
            console.error('Error obteniendo contrato por ID:', e);
        }
    }

    public async firmar(contrato: Contrato, codigo: string) {
        try {
            const { id } = contrato;

            console.log('Firmando contrato ID:', id, 'con OTP:', codigo);
            const response = await fetch(`http://${CONFIG.BACKEND_HOST}:${CONFIG.BACKEND_PORT}/contratos/firmar`, {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    "contractId": id,
                    "otp": codigo
                })
            });

            const data = await response.json();

            if (data.success) {
                return { success: data.success, message: data.message, txHash: data.txHash };
            } else {
                throw Error(data.message);
            }
        } catch (e) {
            console.error('Error firmando contrato:', e);
            throw Error(`Error firmando contrato -> , ${e}`);
        }
    }
}

export default new ContratoService();