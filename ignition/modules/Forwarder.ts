import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ForwarderModule = buildModule("ForwarderModule", (m) => {4
    const forwarder = m.contract("ERC2771Forwarder", ["Soy Contract Forwarder"]);

    return {forwarder};
});

export default ForwarderModule;