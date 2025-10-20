import {buildModule} from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TokenContratoSoja",(m)=> {
    const tokenContratoSoja = m.contract("ContratoGranosSoja");

    return {tokenContratoSoja};
})