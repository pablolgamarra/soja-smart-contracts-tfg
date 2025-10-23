import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ForwarderModule = buildModule("Forwarder", (m) => {4
    const minimalForwarder = m.contract("MinimalForwarder");

    return {minimalForwarder};
});

export default ForwarderModule;