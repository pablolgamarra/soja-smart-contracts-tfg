import PageWrapper from "@components/common/PageWrapper";
import FormContratoFirmar from "@components/contrato/forms/firmar/FormContratoFirmar";

const FirmarContrato:React.FC = () => {
    return (
        <PageWrapper>
            <article className="w-6/12 mt-6">
                <FormContratoFirmar />
            </article>
        </PageWrapper>
    );
}

export default FirmarContrato;