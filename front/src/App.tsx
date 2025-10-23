import { useEffect, useState } from "react";
import { useContrato } from "./hooks/useContract";

function App() {
    const contrato = useContrato();
    const [ nombre, setNombre ] = useState("");

    useEffect(() => {
        async function fetchName() {
            if (!contrato) return;
            const n = await contrato.name();
            console.log(contrato)
            setNombre(n);
        }
        fetchName();
    }, [ contrato ]);

    return (
        <div style={{ padding: 20 }}>
            <h1>Contrato de Granos - NFT</h1>
            <p>Nombre del contrato: {nombre || "Cargando..."}</p>
        </div>
    );
}

export default App;
