import {
  BrowserProvider,
  Contract,
  ContractRunner,
  JsonRpcProvider,
  InterfaceAbi,
} from "ethers";
import abiJson from "@/artifacts/VeriESG.json" assert { type: "json" };

type BlockchainConfig = {
  contractAddress: string;
  abi: InterfaceAbi;
};

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export class BlockchainService {
  private provider: BrowserProvider | JsonRpcProvider;
  private signer: ContractRunner | null = null;
  private contract: Contract | null = null;
  private readonly config: BlockchainConfig;

  constructor(provider: BrowserProvider | JsonRpcProvider, config: BlockchainConfig) {
    this.provider = provider;
    this.config = config;
  }

  async init() {
    const signer = this.provider instanceof BrowserProvider ? await this.provider.getSigner() : this.provider;
    this.signer = signer;

    this.contract = new Contract(
      this.config.contractAddress,
      this.config.abi,
      signer,
    );
  }

  assertContractReady() {
    if (!this.contract || !this.signer) {
      throw new Error("Blockchain service not initialized");
    }
  }

  async recordDataHash(dataType: string, dataHash: string, auditor: string) {
    this.assertContractReady();
    const tx = await this.contract!.recordDataHash(
      dataType,
      dataHash,
      auditor,
    );
    return tx.wait();
  }

  async verifyDataHash(dataHash: string) {
    this.assertContractReady();
    return this.contract!.verifyDataHash(dataHash);
  }

  async issueCertificate(dataHash: string) {
    this.assertContractReady();
    const tx = await this.contract!.issueCertificate(dataHash);
    return tx.wait();
  }

  async getRecord(dataHash: string) {
    this.assertContractReady();
    return this.contract!.getRecord(dataHash);
  }
}

export function createBlockchainService({
  provider,
  contractAddress,
}: {
  provider: BrowserProvider | JsonRpcProvider;
  contractAddress: string;
}) {
  return new BlockchainService(provider, {
    contractAddress,
    abi: abiJson.abi as InterfaceAbi,
  });
}

