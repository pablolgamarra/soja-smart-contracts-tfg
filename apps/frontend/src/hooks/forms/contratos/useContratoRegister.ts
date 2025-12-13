// @hooks/useContratoRegister.ts
import { useState, useCallback } from "react";
import ContratoService from "@services/ContratoService";
import OTPService from "@services/OTPService";
import { type IFormContratoRegisterState } from "@components/contrato/forms/crear/FormContratoRegister";
import { useWeb3Context } from "@hooks/useWeb3Context";
import { useToast } from "@hooks/useToast";
import { TipoContrato } from "@constants/TipoContrato";
import { EstadoContrato } from "@constants/EstadoContrato";
import getEnv from "@helpers/getEnv";
import type { Contrato } from "@types/Contrato";

const INITIAL_FORM_STATE: IFormContratoRegisterState = {
    // IDENTIFICADORES
    billeteraComprador: '',
    billeteraVendedor: '',
    billeteraBroker: '',
    nombreComprador: '',
    nombreVendedor: '',
    nombreBroker: '',
    nroFiscalComprador: '',
    nroFiscalVendedor: '',
    nroFiscalBroker: '',
    emailComprador: '',
    telefonoComprador: '',
    emailVendedor: '',
    telefonoVendedor: '',
    // CONDICIONES DEL GRANO
    cantidadToneladas: 0,
    tipoGrano: '',
    cosecha: '',
    // CONDICIONES DE ENTREGA
    empaque: '',
    fechaEntregaInicio: '',
    fechaEntregaFin: '',
    // CONDICIONES DE PRECIO
    tipoContrato: TipoContrato.PrecioFijo,
    precioPorToneladaMetrica: 0,
    precioCBOTBushel: 0,
    ajusteCBOT: 0,
    fechaPrecioChicago: '',
    incoterm: 'F.O.B.',
    precioFinal: 0,
    // CONDICIONES EMBARQUE
    puertoEmbarque: '',
    destinoFinal: '',
    // CONDICIONES CONTRATO
    hashVersionContrato: '',
    evidenceURI: '',
    fechaCelebracionContrato: Date.now(),
    estado: EstadoContrato.Borrador,
    clausulasAdicionales: [{ clausula: '', CID: '' }]
} as IFormContratoRegisterState;

// Estado precompletado para pruebas
const TEST_STATE: IFormContratoRegisterState = {
    // IDENTIFICADORES
    billeteraComprador: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    nroFiscalComprador: '123456789-0',
    nombreComprador: 'Glymax',
    billeteraVendedor: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    billeteraBroker: '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
    nombreVendedor: 'Lorenzo Escobar',
    nombreBroker: 'Lorenzeti',
    nroFiscalVendedor: '6090356-0',
    nroFiscalBroker: '1597538426-0',
    emailComprador: 'pablogamarra@glymax.com',
    telefonoComprador: '595993373436',
    emailVendedor: 'pablogamarra@glymax.com',
    telefonoVendedor: '595993373436',
    // CONDICIONES DEL GRANO
    cantidadToneladas: 0,
    tipoGrano: 'Soja',
    cosecha: '2024',
    // CONDICIONES DE ENTREGA
    empaque: 'Granel',
    fechaEntregaInicio: '2025-11-13',
    fechaEntregaFin: '2025-11-13',
    // CONDICIONES DE PRECIO
    tipoContrato: TipoContrato.PrecioFijo,
    precioPorToneladaMetrica: 159753,
    precioCBOTBushel: 0,
    ajusteCBOT: 0,
    fechaPrecioChicago: '',
    incoterm: 'F.O.B.',
    precioFinal: 0,
    // CONDICIONES EMBARQUE
    puertoEmbarque: 'Puerto Rosario',
    destinoFinal: 'Copenhagen',
    // CONDICIONES CONTRATO
    hashVersionContrato: 'hashVersionContrato_v1',
    evidenceURI: 'http://localhost:1234/evidencia',
    fechaCelebracionContrato: Date.now(),
    estado: EstadoContrato.Borrador,
    // clausulasAdicionales: [ { clausula: '', CID: '' } ]
}

const env = getEnv("ENV");

export const useContratoRegister = () => {
    const [ formState, setFormState ] = useState<IFormContratoRegisterState>(INITIAL_FORM_STATE);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const web3Context = useWeb3Context();
    const { addToast } = useToast();

    const handleInputChanges = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // Convertir números si es necesario
        const finalValue = type === 'number' ? Number(value) : value;
        setFormState(prev => ({ ...prev, [ name ]: finalValue }));
    }, []);

    const handleClausulaChange = useCallback((index: number, field: keyof IFormContratoRegisterState[ 'clausulasAdicionales' ][ 0 ], value: string) => {
        setFormState(prev => {
            const newClausulas = [ ...(prev.clausulasAdicionales || []) ];
            newClausulas[ index ] = { ...newClausulas[ index ], [ field ]: value };
            return { ...prev, clausulasAdicionales: newClausulas };
        });
    }, []);

    const addClausula = useCallback(() => {
        setFormState(prev => ({
            ...prev,
            clausulasAdicionales: [ ...(prev.clausulasAdicionales || []), { clausula: '', CID: '' } ]
        }));
    }, []);

    const removeClausula = useCallback((index: number) => {
        setFormState(prev => ({
            ...prev,
            clausulasAdicionales: prev.clausulasAdicionales.filter((_, i) => i !== index)
        }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        let finalState: IFormContratoRegisterState = formState;

        if(env === "development") {
            finalState = TEST_STATE;
            console.log("Submitting contrato with state:", finalState);
        }

        try {
            // Crear el contrato en la blockchain
            const contractResponse = await ContratoService.crearContrato(finalState, web3Context);

            if (contractResponse.success && contractResponse.contractId) {

                // Generar y enviar el OTP
                const otpResponse = await OTPService.generarOtpContrato({
                    id: contractResponse.contractId,
                    emailVendedor: finalState.emailVendedor,
                    telefonoVendedor: finalState.telefonoVendedor
                } as Contrato); // Usar el tipo Contrato adecuado

                if (otpResponse) {
                    addToast("Contrato creado y OTP enviado al vendedor con éxito.", "success");
                } else {
                    addToast("Contrato creado, pero hubo un error al generar el OTP.", "warning");
                }
            } else {
                addToast("Error al crear el contrato en la blockchain.", "error");
            }
        } catch (error) {
            console.error("Error en la creación/OTP:", error);
            addToast("Hubo un error procesando el contrato.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formState,
        isSubmitting,
        handleInputChanges,
        handleClausulaChange,
        addClausula,
        removeClausula,
        handleSubmit,
        web3Context,
    };
};