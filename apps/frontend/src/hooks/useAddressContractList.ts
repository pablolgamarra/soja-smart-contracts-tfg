// import type { ethers } from "ethers";
// import { useEffect, useState } from "react"

// export const useAddressContractList = (deployedContract: ethers.Contract | null, userAddress: string | null) => {
//     const [ contracts, setcontracts ] = useState<ethers.Contract[]>([]);
//     const [ loading, setLoading ] = useState(false);
//     const [ error, setError ] = useState<string | null>(null);

//     useEffect(()=> {
//         const obtenercontracts = async () => {
//             try {
//                 if (!deployedContract || deployedContract == null) {
//                     throw new Error("Contrato Desplegadono encontrado");
//                 }
//                 console.log("Direccion de contrato desplegado:", await deployedContract.getAddress());
//                 // Obtener todos los contracts
//                 const contractsData = await deployedContract.obtenerContratos();

//                 // Filtrar contracts creados por el comprador (userAddress)
//                 const contractsFiltrados = contractsData.filter((contract: any) => contract.identificadorPartes.comprador === userAddress);
//                 setcontracts(contractsFiltrados);
//             } catch (err: any) {
//                 console.error(err);
//                 setError("Error al obtener contractos");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         obtenercontracts();
//     }, [deployedContract, userAddress]);

//     return {contracts, loading, error};
// }

import type { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useAddressContractList = (
    deployedContract: ethers.Contract | null,
    userAddress: string | null,
    isConnected: boolean,
    isLoadingContext: boolean
) => {
    const [ contracts, setContracts ] = useState<any[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const obtenerContracts = async () => {
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

                const contractsData = await deployedContract.obtenerContratos();

                const filtrados = contractsData.filter(
                    (c: any) =>
                        c.identificadorPartes.comprador?.toLowerCase() ===
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
    }, [ deployedContract, userAddress, isConnected, isLoadingContext ]);

    return { contracts, loading, error };
};
