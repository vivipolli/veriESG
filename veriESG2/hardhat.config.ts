import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@vechain/sdk-hardhat-plugin";
import "dotenv/config";

const getEnvMnemonic = () => {
  const mnemonic = process.env.MNEMONIC?.trim();

  return mnemonic && mnemonic.length > 0 ? mnemonic : undefined;
};

const VECHAIN_DERIVATION_PATH = "m/44'/818'/0'/0";

const getVechainAccounts = () => {
  const mnemonic = getEnvMnemonic();
  const initialIndex = process.env.VECHAIN_ACCOUNT_INDEX ? parseInt(process.env.VECHAIN_ACCOUNT_INDEX) : 0;

  if (!mnemonic) {
    return undefined;
  }

  return {
    mnemonic,
    path: VECHAIN_DERIVATION_PATH,
    count: 20,
    initialIndex,
  };
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.28",
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          evmVersion: "paris",
        },
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL ?? "",
      accounts: process.env.SEPOLIA_PRIVATE_KEY
        ? [process.env.SEPOLIA_PRIVATE_KEY]
        : [],
    },
    vechain_testnet: {
      url: process.env.VECHAIN_TESTNET_RPC_URL ?? "https://vethor-node-test.vechaindev.com",
      accounts: getVechainAccounts(),
      gas: 10000000,
    },
    vechain_mainnet: {
      url: process.env.VECHAIN_MAINNET_RPC_URL ?? "https://mainnet.vechain.org",
      accounts: getVechainAccounts(),
      gas: 10000000,
    },
  },
  ignition: {
    requiredConfirmations: 0,
  },
};

export default config;
