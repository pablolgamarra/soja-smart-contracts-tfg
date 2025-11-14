import PageWrapper from "@components/common/PageWrapper";
import ListarContratos from "@components/contrato/lists/ListarContratos";

const Home:React.FC = ()=>{
    return (
        <PageWrapper>
                <ListarContratos />
        </PageWrapper>
    )
}

export default Home;