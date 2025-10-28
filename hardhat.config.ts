import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";

const config: HardhatUserConfig = {
  plugins: [hardhatEthers, hardhatToolboxMochaEthersPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.30",
      },
      production: {
        version: "0.8.30",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
        type: "http",
        url: "http://127.0.0.1:8545",
        accounts: "remote",
        chainType: "op",
    },
    // // hardhatMainnet: {
    // //   type: "edr-simulated",
    // //   chainType: "l1",
    // // },
    // hardhatOp: {
    //   type: "edr-simulated",
    //   chainType: "op",
    // },
    // sepolia: {
    //   type: "http",
    //   chainType: "l1",
    //   url: configVariable("SEPOLIA_RPC_URL"),
    //   accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    // },
  },
};

export default config;
