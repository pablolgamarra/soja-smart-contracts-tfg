import Button from "@components/common/Button";
import { InputField } from "@components/common/InputField";
import CardContratoFull from "@components/contrato/cards/CardContratoFull";
import type { Contrato } from "@types/Contrato";
import React, { useState } from "react";
import ContratoService from "@services/ContratoService";  // Servicio para firmar el contrato
import OTPService from "@services/OTPService";  // Servicio para firmar el contrato
import { Link } from "react-router-dom";
import { Code, SquarePen } from "lucide-react";
import Section from "@components/common/Section";

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
                const contrato = await ContratoService.obtenerPorId(formState.idContrato);

                if(!contrato){
                    throw Error(`Contrato con ID no encontrado -> ${e}`);
                }

                const res = await OTPService.validarOtpContrato(contrato, formState.codigoOtp);

                if (res) {
                    alert("✅ OTP verificado correctamente");
                    setContrato(contrato);
                    setViewMode('VERIFIED');

                    // Aquí firmamos el contrato después de verificar el OTP
                    await firmarContrato(contrato);
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
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 mb-6 border border-gray-700">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                        Firmar un Contrato
                    </h1>
                    <p className="text-gray-400 text-lg">Ingrese los datos que le fueron enviados</p>
                </div>
                <Section icon={SquarePen} title="Datos Para Validar" variant="info">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                </Section>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-6 pb-8">
                    <Link to="/">
                        <Button type="button" variant="secondary">
                            Cancelar
                        </Button>
                    </Link>
                    <Button type="button" variant="success" onClick={handleBtnPress} disabled={loading}>
                        {loading ? "Verificando..." : "Verificar Código OTP"}
                    </Button>
                </div>
            </form>

            {
                (viewMode === "VERIFIED") &&
                <CardContratoFull contrato={contrato!} />
            }
        </>
    );
};

export default FormContratoFirmar;
