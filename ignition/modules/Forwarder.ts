import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ForwarderModule = buildModule("ERC2771Forwarder", (m) => {4
    const minimalForwarder = m.contract("ERC2771Forwarder");

    return {minimalForwarder};
});

export default ForwarderModule;