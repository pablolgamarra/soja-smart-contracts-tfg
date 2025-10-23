import {buildModule} from "@nomicfoundation/hardhat-ignition/modules";
import ForwarderModule from "./Forwarder.js";

const ContratoGranosSojaModule = buildModule("ContratoGranosSoja",(m)=> {
    const forwarder = m.useModule(ForwarderModule);

    const relayerAddress = m.getParameter("relayerAddress");

    const contratoGranosSoja = m.contract("ContratoGranosSoja", [
        forwarder,
        relayerAddress
    ]);

    return {contratoGranosSoja};
})


export default ContratoGranosSojaModule;