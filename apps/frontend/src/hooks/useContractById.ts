import ContratoService from "@services/ContratoService";
import type { Contrato } from "@types/Contrato";
import { useEffect, useState } from "react";
import { contratosMock } from "@mock/contratosMock";
import getEnv from "@helpers/getEnv";

export const useContractById = (id: string | undefined) => {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ contrato, setContrato ] = useState<Contrato | undefined>(undefined);
    const [ error, setError ] = useState<string | undefined>(undefined);

    const env = getEnv("ENV");

    useEffect(()=>{
        //Obtener contrato por id llamando a API
        const fetchContrato= async () => {
            try {
                // if (env === "development") {
                //     setContrato(contratosMock[id]);
                //     setLoading(false);
                //     return;
                // }

                const data = await ContratoService.obtenerPorId(id as string);
                setContrato(data);
            }catch(e){
                console.log(e);
                setError("No se pudo cargar el contrato.");
            }finally{
                setLoading(false);
            }
        }
        
        fetchContrato()
    },[id, env])

    return {contrato, loading, error};
}