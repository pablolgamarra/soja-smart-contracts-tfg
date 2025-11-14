import { Request, Response, NextFunction } from "express";
import { crearTransaccion, obtenerContratoDesdeBlockchain } from "@services/relayerServices.ts";
import { convertBigIntToString, getEnv } from "@helpers/index.ts";
import { blockchainConnection } from "@blockchain/BlockchainConnection.ts";
import { EventLog } from "ethers";
import { getOtpByContractAndSeller, markOtpAsUsed } from "@data/dao/dao.ts";

const { contratoView } = blockchainConnection;

const CONFIG = {
    relayer: getEnv("RELAYER_ADDRESS")
}

class ContratosController{
    public obtenerPorId = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ error: "ID del contrato requerido." });
            }
    
            // Leer desde blockchain usando ethers.js
            const contrato = await obtenerContratoDesdeBlockchain(id);
    
            if (!contrato) {
                return res.status(404).json({ error: "Contrato no encontrado en blockchain." });
            }
    
            // Convertir BigInt a string antes de enviar la respuesta
            const contratoSinBigInt = convertBigIntToString(contrato);
    
            res.json({
                success: true,
                contrato: contratoSinBigInt,
            });
        } catch (e) {
            console.error("Error obteniendo contrato:", e);
            next(e);
        }
    }

    public obtenerEventoPorId = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params;
            const contractId = parseInt(id);
    
            if (isNaN(contractId)) {
                return res.status(400).json({ error: "ID de contrato inválido" });
            }
    
            // Leer desde blockchain usando ethers.js
            const contrato = await obtenerContratoDesdeBlockchain(id);
    
            if(!contrato || contrato === null) {
                return res.status(400).json({ error: `Contrato con ID: ${contractId} no encontrado en los registros` });
            }
    
            // Obtener filtros para cada tipo de evento (filtrado por idContrato)
            const filters = {
                creado: contratoView.filters.ContratoCreado(contractId),
                firmado: contratoView.filters.ContratoFirmado(contractId),
                entrega: contratoView.filters.EntregaConfirmada(contractId),
                cerrado: contratoView.filters.ContratoCerrado(contractId),
            };
    
            // Consultar logs de todos los tipos
            const logs = await Promise.all(
                Object.entries(filters).map(async ([ nombre, filtro ]) => {
                    const eventos = await contratoView.queryFilter(filtro, 0, "latest");
    
                    // Filtrar los logs que sí tienen args
                    const eventosDecodificados = eventos
                        .filter((ev): ev is EventLog => "args" in ev)
                        .map((ev) => ({
                            nombre,
                            blockNumber: ev.blockNumber,
                            txHash: ev.transactionHash,
                            args: Object.entries(ev.args || {}).map(([ k, v ]) => `${k}: ${v?.toString?.()}`),
                        }));
    
                    return eventosDecodificados;
                })
            );
    
            // Aplanar y ordenar por bloque
            const eventosPlano = logs.flat().sort((a, b) => a.blockNumber - b.blockNumber);
    
            res.json({
                success: true,
                total: eventosPlano.length,
                eventos: eventosPlano,
            });
        } catch (e) {
            console.error("Error obteniendo eventos:", e);
            next(e);
        }
    }

    public firmarContrato = async (req:Request, res:Response) => {
        try {
            const { contractId, otp } = req.body;
    
            const sellerAddress = CONFIG.relayer 

            if (!contractId || !otp) {
                return res.status(400).json({ error: "Datos incompletos" });
            }
    
            // Buscar OTP en base de datos
            const otpRecord = await getOtpByContractAndSeller(contractId, sellerAddress);
    
            if (!otpRecord) {
                return res.status(404).json({ error: "OTP no encontrado" });
            }
    
            if (otpRecord.otp !== otp) {
                return res.status(401).json({ error: "OTP incorrecto" });
            }
    
            if (new Date(otpRecord.expiresAt) < new Date()) {
                return res.status(410).json({ error: "OTP expirado" });
            }
    
            if (otpRecord.used) {
                return res.status(409).json({ error: "OTP ya utilizado" });
            }
    
            // Marcar OTP como usado
            await markOtpAsUsed(otpRecord.id.toString());
    
            // Ejecutar la transacción de firma meta-tx
            const tx = await crearTransaccion({ contractId, sellerAddress });
    
            res.json({
                success: true,
                message: "Contrato firmado correctamente.",
                txHash: tx.hash,
            });
        } catch (e) {
            console.error("Error firmando contrato:", e);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default new ContratosController();