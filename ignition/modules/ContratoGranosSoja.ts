import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ForwarderModule from "./Forwarder.js";

// Aquí usamos `useModule` para obtener el forwarder desplegado
const ContratoGranosSojaModule = buildModule("ContratoGranosSojaModule", (m) => {
    // Esperamos a que el forwarder se haya desplegado correctamente
    const { forwarder } = m.useModule(ForwarderModule);

    // Parámetro de relayer que debe pasarse en el comando de despliegue
    const relayerAddress = m.getParameter("relayerAddress");

    // Desplegamos el contrato, pasando la dirección del forwarder y del relayer
    const contrato = m.contract("ContratoGranosSoja", [
        forwarder,  // Aquí resolvemos el `forwarder` para obtener la dirección
        relayerAddress,     // Dirección del relayer
    ]);

    return { contrato };
});

export default ContratoGranosSojaModule;
