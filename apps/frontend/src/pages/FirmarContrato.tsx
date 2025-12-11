import FormContratoFirmar from "@components/contrato/forms/firmar/FormContratoFirmar";
import BaseLayout from "@components/layouts/BaseLayout";

const FirmarContrato:React.FC = () => {
    return (
        <BaseLayout>
            <FormContratoFirmar />
        </BaseLayout>
    );
}

export default FirmarContrato;