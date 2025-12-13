import FormContratoFirmar from "@components/contrato/forms/firmar/FormContratoFirmar";
import BaseLayout from "@components/layouts/BaseLayout";
import VendedorLayout from "@components/layouts/VendedorLayout";

export interface IFirmarContratoProps {
    vendedor?:boolean;
}

const FirmarContrato:React.FC<IFirmarContratoProps> = ({vendedor}:IFirmarContratoProps) => {
    if (!vendedor){
        return (
            <BaseLayout>
                <FormContratoFirmar />
            </BaseLayout>
        );
    }else{
        return (
            <VendedorLayout>
                <FormContratoFirmar />
            </VendedorLayout>
        );
    }

}

export default FirmarContrato;