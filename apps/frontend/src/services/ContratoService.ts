import type { Web3ContextType } from "@context/Web3Context";
import getEnv from "@helpers/getEnv.ts";
import { useWeb3Context } from "@hooks/useWeb3Context";
import type { Contrato } from "@types/Contrato"; // Asegúrate de que este tipo esté bien definido
import type { OTP } from "@types/OTP";
import { ethers } from "ethers";
import OTPService from "src/services/OTPService";

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

            if(!contrato.emailVendedor && !contrato.telefonoVendedor){
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
                fechaEntregaInicio: contrato.fechaEntregaInicio || Date.now(),
                fechaEntregaFin: contrato.fechaEntregaFin || Date.now() + 60 * 60 * 24 * 30 * 1000, // Fecha de 30 días por defecto
            };

            const condicionesPrecio = {
                tipoContrato: contrato.tipoContrato,
                precioPorToneladaMetrica: contrato.precioPorToneladaMetrica || 0,
                precioCBOTBushel: contrato.precioCBOTBushel || 0,
                ajusteCBOT: contrato.ajusteCBOT || 0, // Al par=0 / más=1 / menos=-1
                fechaPrecioChicago: contrato.fechaPrecioChicago || Date.now(),
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
            };

            console.log("🧾 Enviando transacción para crear contrato...");

            // Llamada al contrato para crear
            const tx = await deployedContract
                .connect(signer)
                .crearContrato(contratoSend);

            // Esperar a que la transacción se confirme
            const receipt = await tx.wait();

            // Obtener el ID del contrato creado (usualmente es el contador de contratos en el mapping)
            const contractId = await deployedContract.contadorContratos();

            console.log(`✅ Contrato creado con ID: ${contractId}`);
            console.log(`✅ TX Hash: ${receipt.transactionHash}`);

            // Ahora, genera el OTP con el contractId utilizando OTPService
            const otpRes = await OTPService.generarOtpContrato({
                id: contractId.toString(),
                emailVendedor: contrato.emailVendedor || "", // O usa la dirección de correo del vendedor si lo prefieres
            } as Contrato);

            if (otpRes) {
                alert("✅ Contrato creado con éxito. Enviando OTP al vendedor");
            } else {
                alert("❌ Error al generar OTP");
            }

            console.log("📦 TX confirmada:", receipt.transactionHash);
        } catch (err) {
            console.error("❌ Error al crear contrato:", err);
            alert(`Error: ${err.message || "Error desconocido"}`);
        }
    }

    public async obtenerPorId(id:string) {
        try {
            const response = await fetch(`http://${CONFIG.BACKEND_HOST}:${CONFIG.BACKEND_PORT}/contratos/${id.toString()}`, {
                method: "GET",
            });

            const data = await response.json();

            if (data.success) {
                return data.contrato;
            } else {
                throw Error(data.message);
            }
        } catch (e) {
            throw Error(`Error obteniendo contrato por Id -> ${e}`)
        }
    }

    public async obtenerEventos(contrato:Contrato) {
        try {
            const {id} = contrato;
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
    
    public async firmar(contrato:Contrato, otp: OTP) {
        try {
            const {id} = contrato;
            const {codigo} = otp;

            const response = await fetch(`http://${CONFIG.BACKEND_HOST}:${CONFIG.BACKEND_PORT}/contratos/firmar`, {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    contractId: id,
                    otp: codigo
                })
            });

            const data = await response.json();

            if (data.success) {
                return {message: data.message, txHash: data.txHash};
            } else {
                throw Error(data.message);
            }
        } catch (e) {
            console.error('Error firmando contrato:', e);
        }
    } 
}

export default new ContratoService();
