import PageWrapper from "@components/common/PageWrapper";
import FormContratoRegister from "@components/contrato/forms/crear/FormContratoRegister";

const CrearContrato: React.FC = () => {
    return (
        <PageWrapper>
            <article>
                <h1>Crear nuevo Contrato</h1>
                <FormContratoRegister />
            </article>
        </PageWrapper>
    );
}

export default CrearContrato;