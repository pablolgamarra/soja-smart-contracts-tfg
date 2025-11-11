import Button from "@components/common/Button";
import { InputField } from "@components/common/InputField";
import CardContratoFull from "@components/contrato/cards/CardContratoFull";
import type { Contrato } from "@types/Contrato";
import React, { useState } from "react";
import ContratoService from "@services/ContratoService";  // Servicio para firmar el contrato
import OTPService from "@services/OTPService";  // Servicio para firmar el contrato

export interface IFormContratoFirmarState {
    idContrato: string;
    codigoOtp: string;
}

export interface IFormContratoFirmarProps {
    initialStateValues?: IFormContratoFirmarState;
}

const FormContratoFirmar: React.FC<IFormContratoFirmarProps> = ({ initialStateValues }) => {
    const [ formState, setFormState ] = useState<IFormContratoFirmarState>(
        initialStateValues || { idContrato: "", codigoOtp: "" }
    );
    const [ loading, setLoading ] = useState(false);
    const [ viewMode, setViewMode ] = useState<'VERIFIED' | 'UNVERIFIED'>('UNVERIFIED');
    const [ contrato, setContrato ] = useState<Contrato | undefined>(undefined);

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [ name ]: value }));
    };

    const handleBtnPress = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        const checkOtp = async () => {
            try {
                const res = await OTPService.validarOtpContrato(formState.idContrato, formState.codigoOtp);

                if (res.success) {
                    alert("✅ OTP verificado correctamente");
                    const contrato = await ContratoService.obtenerPorId(formState.idContrato);
                    setContrato(contrato);
                    setViewMode('VERIFIED');

                    // Aquí firmamos el contrato después de verificar el OTP
                    await firmarContrato(contrato);
                } else {
                    alert(`❌ Error: ${res.message || "OTP inválido"}`);
                }
            } catch (err) {
                console.error(err);
                alert("Error al verificar el OTP");
            } finally {
                setLoading(false);
            }
        }

        checkOtp();
    };

    const firmarContrato = async (contrato: Contrato) => {
        try {
            // Aquí usas el servicio de ContratoService para firmar el contrato
            const firmarResponse = await ContratoService.firmar(contrato, formState.codigoOtp);

            if (firmarResponse.success) {
                alert("✅ Contrato firmado correctamente.");
            } else {
                alert("❌ Error al firmar el contrato.");
            }
        } catch (err) {
            console.error(err);
            alert("Error al firmar el contrato.");
        }
    };

    return (
        <>
            <form className="flex flex-col gap-4 p-4 bg-gray-800 rounded-xl shadow-lg text-gray-100">
                <InputField
                    label="ID del Contrato"
                    name="idContrato"
                    type="text"
                    value={formState.idContrato}
                    onChange={handleInputChanges}
                    required
                />
                <InputField
                    label="Código OTP"
                    name="codigoOtp"
                    type="text"
                    onChange={handleInputChanges}
                    value={formState.codigoOtp}
                    required
                />
                <Button onClick={handleBtnPress} disabled={loading}>
                    {loading ? "Verificando..." : "Verificar Código OTP"}
                </Button>
            </form>

            {
                (viewMode === "VERIFIED") &&
                <CardContratoFull contrato={contrato!} />
            }
        </>
    );
};

export default FormContratoFirmar;
