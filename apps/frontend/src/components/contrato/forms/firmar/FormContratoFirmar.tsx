// @components/contrato/forms/crear/FormContratoFirmar.tsx
import React from "react";
import Button from "@components/common/Button";
import { InputField } from "@components/common/InputField";
import CardContratoFull from "@components/contrato/cards/CardContratoFull";
import { Link } from "react-router-dom";
import { SquarePen } from "lucide-react";
import Section from "@components/common/Section";
import { useContratoFirmar } from "@hooks/forms/contratos/useContratoFirmar"; // 👈 Usar el hook

// Ya no necesitamos IFormContratoFirmarState o IFormContratoFirmarProps aquí,
// ya que el hook maneja el estado.

const FormContratoFirmar: React.FC = () => {

    // Obtener la lógica del hook
    const {
        formState,
        loading,
        viewMode,
        contrato,
        handleInputChanges,
        handleVerifyOTP,
        handleSignContract,
    } = useContratoFirmar();

    // Renderizado condicional
    if (viewMode === "VERIFIED" && contrato) {
        return (
            <div className="flex flex-col gap-6 p-4 bg-gray-800 rounded-xl shadow-lg text-gray-100 w-full max-w-4xl mx-auto mt-6">
                <CardContratoFull contrato={contrato} />
                <div className="flex justify-end gap-4 pt-6 pb-2 border-t border-gray-700">
                    <Link to="/">
                        <Button type="button" variant="secondary">
                            Cancelar
                        </Button>
                    </Link>
                    <Button type="button" variant="success" onClick={handleSignContract} disabled={loading}>
                        {loading ? "Firmando..." : "Firmar Contrato"}
                    </Button>
                </div>
            </div>
        );
    }

    // Renderizado UNVERIFIED (Formulario)
    return (
        <form className="flex flex-col gap-4 p-4 bg-gray-800 rounded-xl shadow-lg text-gray-100 w-full max-w-4xl mx-auto mt-6">
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

            {/* Botones */}
            <div className="flex justify-end gap-4 pt-6 pb-8">
                <Link to="/">
                    <Button type="button" variant="secondary">
                        Cancelar
                    </Button>
                </Link>
                <Button
                    type="submit"
                    variant="success"
                    onClick={handleVerifyOTP}
                    disabled={loading || !formState.idContrato || !formState.codigoOtp}
                >
                    {loading ? "Verificando..." : "Verificar Código OTP"}
                </Button>
            </div>
        </form>
    );
};

export default FormContratoFirmar;