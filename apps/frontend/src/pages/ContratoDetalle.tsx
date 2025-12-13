import { useParams } from "react-router-dom";
import CardContratoFull from "@components/contrato/cards/CardContratoFull";
import Button from "@components/common/Button";
import { useContractById } from "@hooks/useContractById";
import { EstadoContrato } from "@constants/EstadoContrato";
import { Link } from "lucide-react";
import LoadingComponent from "@components/common/LoadingComponent";
import BaseLayout from "@components/layouts/BaseLayout";
import { mapEstadoContrato } from "@helpers/constantMapHelpers";

export default function ContratoDetalle() {
    const { id } = useParams();
    const { contrato, loading, error } = useContractById(id);
    
    if (loading)
        return <LoadingComponent message={`Cargando Contrato ${id}`}/>;
    
    
    if(!contrato && !loading && !error) {
        return (
            <div className="text-center mt-10 text-red-400">
                <p>Contrato no encontrado</p>
            </div>
        );
    }

    return (
        <BaseLayout>
            <div className="p-6 max-w-4xl mx-auto">
                {/* <Button variant="primary">
                    <a href="/">← Volver</a>
                </Button> */}
                
                {contrato && (
                    <CardContratoFull contrato={contrato} />
                )}
                {contrato && (mapEstadoContrato(Number(contrato.estado)) === "Borrador" || mapEstadoContrato(Number(contrato.estado)) === "Enviado") && (
                        <div className="mt-8 text-center">
                            <p className="text-yellow-400 mb-4">Este contrato requiere su firma. ¿Desea proceder?</p>
                            {/* Asumimos que /firmar/:id lleva al FormContratoFirmar */}
                            <Link to={`/firmar/${contrato.id}`}>
                                <Button variant="success" className="px-8 py-3 text-lg">
                                    Firmar Contrato Ahora
                                </Button>
                            </Link>
                        </div>
                    )}
            </div>
        </BaseLayout>
    );
}
