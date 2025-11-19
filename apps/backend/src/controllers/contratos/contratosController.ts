import { Request, Response, NextFunction } from "express";
import { getEnv } from "@helpers/index.ts";
import { blockchainConnection } from "@blockchain/BlockchainConnection.ts";
import { EventLog } from "ethers";
import { getOtpByContractAndSeller, markOtpAsUsed } from "@data/dao/dao.ts";
import { otpService } from "@services/otpService.ts";

const { contratoView } = blockchainConnection;

const CONFIG = {
    relayer: getEnv("RELAYER_ADDRESS")
}

class ContratosController{
    public obtenerPorId = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ success: false, data: undefined, error: "ID del contrato requerido." });
            }
    
            // Leer contrato desde conexion blockchain
            const contrato = await blockchainConnection.obtenerContratoPorId(id);
    
            if (!contrato) {
                return res.status(404).json({ success: false, data: undefined, error: `Contrato con ID ${id}no encontrado en blockchain.` });
            }
    
            res.status(200).json({
                success: true,
                data: contrato,
            });
        } catch (e) {
            next(e);
        }
    }

    public obtenerEventoPorId = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const { id } = req.params;
            const contractId = parseInt(id);
    
            if (!id) {
                return res.status(400).json({ success: false, data: undefined, error: "ID del contrato requerido." });
            }
    
            // Verificar si el contrato buscado esta registrado
            const contrato = await blockchainConnection.obtenerContratoPorId(id);
    
            if(!contrato || contrato === null) {
                return res.status(404).json({ success: false, data: undefined, error: `Contrato con ID ${id}no encontrado en blockchain.` });
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
    
            res.status(200).json({
                success: true,
                eventos: eventosPlano,
                total: eventosPlano.length,
            });
        } catch (e) {
            next(e);
        }
    }

    public firmarContrato = async (req:Request, res:Response, next: NextFunction) => {
        try {
            const { contractId, otp } = req.body;
    
            const sellerAddress = CONFIG.relayer 

            if (!contractId || !otp) {
                return res.status(400).json({ error: 'Datos incompletos' });
            }
    
            // Buscar OTP en base de datos
            const checkOtp = await otpService.verificarOTP(contractId, sellerAddress);
    
            if (checkOtp.message === 'OTP no encontrado') {
                return res.status(404).json({ error: "OTP no encontrado" });
            }
    
            if (checkOtp.message === 'OTP incorrecto') {
                return res.status(401).json({ error: "OTP incorrecto" });
            }
    
            if (checkOtp.message === 'OTP expirado') {
                return res.status(410).json({ error: "OTP expirado" });
            }
    
            if (checkOtp.message === 'OTP ya utilizado') {
                return res.status(409).json({ error: "OTP ya utilizado" });
            }

            if(!checkOtp.valid){
                return res.status(400).json({ error: "Error verificando OTP" });
            }
    
            // Ejecutar la transacción de firma meta-tx
            const tx = await blockchainConnection.firmarContratoMetaTx({id:contractId, billeteraVendedor: sellerAddress});
    
            res.json({
                success: true,
                message: "Contrato firmado correctamente.",
                txHash: tx.hash,
            });
        } catch (e) {
            next(e);
        }
    }
}

export default new ContratosController();