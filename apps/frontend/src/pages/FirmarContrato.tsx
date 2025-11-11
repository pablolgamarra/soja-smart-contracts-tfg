import PageWrapper from "@components/common/PageWrapper";
import FormContratoFirmar from "@components/contrato/forms/firmar/FormContratoFirmar";

const FirmarContrato:React.FC = () => {
    return (
        <PageWrapper>
            <h1>Firmar Contrato</h1>
            <FormContratoFirmar />
        </PageWrapper>
    );
}

export default FirmarContrato;