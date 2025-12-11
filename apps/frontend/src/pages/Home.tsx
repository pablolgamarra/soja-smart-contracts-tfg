import ListaContratos from "@components/contrato/lists/ListaContratos";
import BaseLayout from "@components/layouts/BaseLayout";

const Home:React.FC = ()=>{
    return (
        <BaseLayout>
            <ListaContratos />
        </BaseLayout>
    )
}

export default Home;