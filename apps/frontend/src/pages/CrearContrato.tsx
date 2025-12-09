import FormContratoRegister from "@components/contrato/forms/crear/FormContratoRegister";
import BaseLayout from "@components/layouts/BaseLayout";

const CrearContrato: React.FC = () => {
    return (
        <BaseLayout>
            <div className="flex flex-col gap-6 p-8 bg-gray-900 rounded-xl shadow-2xl text-gray-100 mt-12 w-full max-w-5xl mx-auto border border-gray-700">
                <FormContratoRegister />
            </div>
        </BaseLayout>
    );
}

export default CrearContrato;