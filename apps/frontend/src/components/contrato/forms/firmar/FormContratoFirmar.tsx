import otpApi from "@api/otpApi";
import Button from "@components/common/Button";
import { InputField } from "@components/common/InputField";
import React, { useState } from "react";

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

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [ name ]: value }));
    };

    const handleBtnPress = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await otpApi.validarOTP(formState.idContrato, formState.codigoOtp);
            if (res.success) alert("✅ OTP verificado correctamente");
            else alert(`❌ Error: ${res.message || "OTP inválido"}`);
        } catch (err) {
            console.error(err);
            alert("Error al verificar el OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-4 p-4 bg-gray-800 rounded-xl shadow-lg text-gray-100">
            <InputField
                label="ID del Contrato"
                name="idContrato"
                type="text"
                onChange={handleInputChanges}
                required
            />
            <InputField
                label="Código OTP"
                name="codigoOtp"
                type="text"
                onChange={handleInputChanges}
                required
            />
            <Button onClick={handleBtnPress} disabled={loading}>
                {loading ? "Verificando..." : "Verificar Código OTP"}
            </Button>
        </form>
    );
};

export default FormContratoFirmar;
