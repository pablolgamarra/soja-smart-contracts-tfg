import FormContratoRegister from "@components/contrato/forms/crear/FormContratoRegister";
import BaseLayout from "@components/layouts/BaseLayout";

const CrearContrato: React.FC = () => {
    return (
        <BaseLayout>
            <FormContratoRegister />
        </BaseLayout>
    );
}

export default CrearContrato;