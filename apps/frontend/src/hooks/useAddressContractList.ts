import getEnv from "@helpers/getEnv";
import type { ethers } from "ethers";
import { useEffect, useState } from "react";
import { contratosMock } from "@mock/contratosMock";
import parseContratoFromChain from "@helpers/parseContratoFromChain";
import type { Contrato } from "@types/Contrato";

export const useAddressContractList = (
    deployedContract: ethers.Contract | null,
    userAddress: string | null,
    isConnected: boolean,
    isLoadingContext: boolean
) => {
    const [ contracts, setContracts ] = useState<any[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    const env = getEnv("ENV");

    useEffect(() => {
        const obtenerContracts = async () => {
            // if (env === "development") {
            //     console.log("🚀 useAddressContractList - deployedContract:", deployedContract);
            //     console.log("🚀 useAddressContractList - userAddress:", userAddress);
            //     console.log("🚀 useAddressContractList - isConnected:", isConnected);
            //     setContracts(contratosMock);
            //     setLoading(false);
            //     return;
            // }

            if (isLoadingContext || !isConnected) return; // Espera hasta que el contexto esté listo

            if (!deployedContract) {
                setError("❌ Contrato no desplegado o no inicializado");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                console.log(
                    "📜 Dirección de contrato desplegado:",
                    await deployedContract.getAddress()
                );

                const rawContracts = await deployedContract.obtenerContratos();

                const parsedContracts = rawContracts.map(parseContratoFromChain);

                const filtrados = parsedContracts.filter(
                    (c: Partial<Contrato>) =>
                        c.billeteraComprador?.toLowerCase() ===
                        userAddress?.toLowerCase()
                );

                setContracts(filtrados);
                setError(null);
            } catch (err) {
                console.error("❌ Error al obtener contratos:", err);
                setError("Error al obtener contratos");
            } finally {
                setLoading(false);
            }
        };

        obtenerContracts();
    }, [ deployedContract, userAddress, isConnected, isLoadingContext, env ]);

    return { contracts, loading, error };
};
