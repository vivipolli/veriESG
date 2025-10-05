import { Interface } from "ethers";
import VeriESGArtifact from "../../../veriESG2/artifacts/contracts/VeriESG.sol/VeriESG.json";

type Clause = Connex.Vendor.TxMessage[0];

export const CONTRACT_ADDRESS = "0xc8011F2C01cF1a02BF8dcA15A949AfA45E5d3FAE";

export interface ESGRecord {
  company: string;
  dataType: string;
  auditor: string;
  timestamp: number;
  verified: boolean;
}

const contractInterface = new Interface(VeriESGArtifact.abi);

export class VeriESGContractServiceDAppKit {
  private contractAddress: string;
  private thor: Connex.Thor;
  private signer: {
    signTx: (clauses: Clause[]) => Promise<{ txid: string }>;
  };

  constructor(
    thor: Connex.Thor,
    signer: {
      signTx: (clauses: Clause[]) => Promise<{ txid: string }>;
    },
    contractAddress: string = CONTRACT_ADDRESS
  ) {
    this.thor = thor;
    this.signer = signer;
    this.contractAddress = contractAddress;
  }

  async recordDataHash(
    dataType: string,
    dataHash: string,
    auditor: string
  ): Promise<string> {
    console.log('🔗 ContractService.recordDataHash called:', {
      dataType,
      dataHash,
      auditor,
      contractAddress: this.contractAddress
    });

    const recordDataHashAbi = VeriESGArtifact.abi.find(
      (fragment) => fragment.type === "function" && fragment.name === "recordDataHash"
    );

    if (!recordDataHashAbi) {
      throw new Error("recordDataHash ABI fragment not found");
    }

    const data = contractInterface.encodeFunctionData("recordDataHash", [
      dataType,
      dataHash,
      auditor
    ]);

    console.log('📝 Encoded function data:', data);

    const clauses = [
      {
        to: this.contractAddress,
        value: 0,
        data,
        abi: recordDataHashAbi,
        comment: "Record ESG data",
        gas: 200000
      }
    ];

    console.log('📋 Transaction clauses:', clauses);

    try {
      const response = await this.signer.signTx(clauses);

      console.log('✅ Transaction signed successfully:', response);
      return response.txid;
    } catch (error) {
      console.error('❌ Transaction signing failed:', error);
      throw error;
    }
  }

  async verifyDataHash(
    dataHash: string,
    verifier: string
  ): Promise<string> {
    console.log('🔗 ContractService.verifyDataHash called:', {
      dataHash,
      verifier,
      contractAddress: this.contractAddress
    });

    const data = contractInterface.encodeFunctionData("verifyDataHash", [
      dataHash,
      verifier
    ]);

    console.log('📝 Encoded function data:', data);

    const clauses = [
      {
        to: this.contractAddress,
        value: 0,
        data,
        abi: VeriESGArtifact.abi.find((fragment) => fragment.type === "function" && fragment.name === "verifyDataHash"),
        comment: "Verify ESG data",
        gas: 150000
      }
    ];

    console.log('📋 Transaction clauses:', clauses);

    try {
      const response = await this.signer.signTx(clauses);

      console.log('✅ Transaction signed successfully:', response);
      return response.txid;
    } catch (error) {
      console.error('❌ Transaction signing failed:', error);
      throw error;
    }
  }

  async issueCertificate(
    dataHash: string,
    issuer: string
  ): Promise<{ txid: string; tokenId: number }> {
    console.log('🔗 ContractService.issueCertificate called:', {
      dataHash,
      issuer,
      contractAddress: this.contractAddress
    });

    const data = contractInterface.encodeFunctionData("issueCertificate", [
      dataHash,
      issuer
    ]);

    console.log('📝 Encoded function data:', data);

    const clauses = [
      {
        to: this.contractAddress,
        value: 0,
        data,
        abi: VeriESGArtifact.abi.find((fragment) => fragment.type === "function" && fragment.name === "issueCertificate"),
        comment: "Issue ESG certificate",
        gas: 210000
      }
    ];

    console.log('📋 Transaction clauses:', clauses);

    try {
      const response = await this.signer.signTx(clauses);

      console.log('✅ Transaction signed successfully:', response);
      
      // For now, return a mock tokenId. In a real implementation,
      // you would need to parse the transaction receipt to get the actual tokenId
      return {
        txid: response.txid,
        tokenId: Math.floor(Math.random() * 1000000) // Mock tokenId
      };
    } catch (error) {
      console.error('❌ Transaction signing failed:', error);
      throw error;
    }
  }

  async getRecord(dataHash: string): Promise<ESGRecord | null> {
    try {
      const functionFragment = contractInterface.getFunction("getRecord");
      const data = contractInterface.encodeFunctionData("getRecord", [dataHash]);

      const result = await this.thor.account(this.contractAddress).method({
        abi: VeriESGArtifact.abi.find(item => item.name === "verifyDataHash"),
        data
      }).call();

      if (!result || !result.data || result.data.length === 0) {
        return null;
      }

      return {
        company: result.data[0],
        dataType: result.data[1],
        auditor: result.data[2],
        timestamp: Number(result.data[3]),
        verified: result.data[4]
      };
    } catch (error) {
      console.error('Error fetching record:', error);
      return null;
    }
  }

  async getCertificateTokenId(dataHash: string): Promise<number | null> {
    try {
      const functionFragment = contractInterface.getFunction("getCertificateTokenId");
      const data = contractInterface.encodeFunctionData("getCertificateTokenId", [dataHash]);

      const result = await this.thor.account(this.contractAddress).method({
        abi: VeriESGArtifact.abi.find(item => item.name === "verifyDataHash"),
        data
      }).call();

      return result && result.length > 0 ? Number(result[0]) : null;
    } catch (error) {
      console.error('Error fetching certificate token ID:', error);
      return null;
    }
  }

  async getTokenURI(tokenId: number): Promise<string | null> {
    try {
      const functionFragment = contractInterface.getFunction("tokenURI");
      const data = contractInterface.encodeFunctionData("tokenURI", [tokenId]);

      const result = await this.thor.account(this.contractAddress).method({
        abi: VeriESGArtifact.abi.find(item => item.name === "verifyDataHash"),
        data
      }).call();

      return result && result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error fetching token URI:', error);
      return null;
    }
  }

  async getBalance(account: string): Promise<number> {
    try {
      const functionFragment = contractInterface.getFunction("balanceOf");
      const data = contractInterface.encodeFunctionData("balanceOf", [account]);

      const result = await this.thor.account(this.contractAddress).method({
        abi: VeriESGArtifact.abi.find(item => item.name === "verifyDataHash"),
        data
      }).call();

      return result && result.length > 0 ? Number(result[0]) : 0;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return 0;
    }
  }

  async getOwnerTokens(owner: string): Promise<number[]> {
    try {
      const functionFragment = contractInterface.getFunction("getOwnerTokens");
      const data = contractInterface.encodeFunctionData("getOwnerTokens", [owner]);

      const result = await this.thor.account(this.contractAddress).method({
        abi: VeriESGArtifact.abi.find(item => item.name === "verifyDataHash"),
        data
      }).call();

      return result && result.length > 0 ? result[0].map((tokenId: any) => Number(tokenId)) : [];
    } catch (error) {
      console.error('Error fetching owner tokens:', error);
      return [];
    }
  }
}

export function createVeriESGContractDAppKit(
  thor: Connex.Thor,
  signer: {
    signTx: (clauses: Clause[]) => Promise<{ txid: string }>;
  }
): VeriESGContractServiceDAppKit {
  return new VeriESGContractServiceDAppKit(thor, signer, CONTRACT_ADDRESS);
}
