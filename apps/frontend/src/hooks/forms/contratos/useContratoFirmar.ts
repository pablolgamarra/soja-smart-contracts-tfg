// @hooks/useContratoFirmar.ts
import { useState, useCallback } from "react";
import ContratoService from "@services/ContratoService";
import OTPService from "@services/OTPService";
import { type Contrato } from "@types/Contrato";
import { useNavigate } from "react-router-dom";
import { useToast } from "@hooks/useToast"; // Asumimos que existe

interface IFormContratoFirmarState {
    idContrato: string;
    codigoOtp: string;
}

export const useContratoFirmar = (initialState?: IFormContratoFirmarState) => {
    const [formState, setFormState] = useState<IFormContratoFirmarState>(
        initialState || { idContrato: "", codigoOtp: "" }
    );
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'VERIFIED' | 'UNVERIFIED'>('UNVERIFIED');
    const [contrato, setContrato] = useState<Contrato | undefined>(undefined);
    
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleInputChanges = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    }, []);

    // 1. Verificar OTP y cargar Contrato
    const handleVerifyOTP = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!formState.idContrato || !formState.codigoOtp) return;

        setLoading(true);
        addToast("Verificando código OTP...", "info");

        try {
            // 1. Obtener Contrato
            const fetchedContrato = await ContratoService.obtenerPorId(formState.idContrato);

            if (!fetchedContrato) {
                throw new Error(`Contrato con ID ${formState.idContrato} no encontrado.`);
            }

            // 2. Validar OTP
            const isOtpValid = await OTPService.validarOtpContrato(fetchedContrato, formState.codigoOtp);

            if (isOtpValid) {
                addToast("✅ OTP verificado correctamente. Puede revisar y firmar el contrato.", "success");
                setContrato(fetchedContrato);
                setViewMode('VERIFIED');
            } else {
                // El backend debería lanzar un error si no es válido, manejado en el catch.
                throw new Error("El código OTP es inválido.");
            }
        } catch (err: any) {
            console.error("Error al verificar OTP:", err);
            addToast(`❌ Error al verificar: ${err.message}`, "error");
        } finally {
            setLoading(false);
        }
    }, [formState.idContrato, formState.codigoOtp, addToast]); // Dependencias

    // 2. Firmar Contrato (sólo disponible en VERIFIED)
    const handleSignContract = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!contrato) return;

        setLoading(true);
        addToast("Enviando firma a la blockchain...", "info");

        try {
            // Llama al servicio de Contrato para la firma
            const firmarResponse = await ContratoService.firmar(contrato, formState.codigoOtp);

            if (firmarResponse.success) {
                addToast(`✅ Contrato ID ${contrato.id} firmado con éxito. TX: ${firmarResponse.txHash}`, "success");
                navigate("/");
            } else {
                throw new Error(firmarResponse.message || "Error al firmar en el backend/relayer.");
            }
        } catch (err: any) {
            console.error("Error al firmar contrato:", err);
            addToast(`❌ Error al firmar: ${err.message}`, "error");
        } finally {
            setLoading(false);
        }
    }, [contrato, formState.codigoOtp, navigate, addToast]);

    return {
        formState,
        loading,
        viewMode,
        contrato,
        handleInputChanges,
        handleVerifyOTP,
        handleSignContract,
    };
};