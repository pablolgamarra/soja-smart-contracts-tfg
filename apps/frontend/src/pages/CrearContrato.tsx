import PageWrapper from "@components/common/PageWrapper";
import FormContratoRegister from "@components/contrato/forms/crear/FormContratoRegister";

const CrearContrato: React.FC = () => {
    return (
        <PageWrapper>
            <article className="w-6/12 mt-6">
                <FormContratoRegister />
            </article>
        </PageWrapper>
    );
}

export default CrearContrato;