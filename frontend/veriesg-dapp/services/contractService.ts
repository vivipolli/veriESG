import { Interface } from "ethers";
import VeriESGArtifact from "../artifacts/VeriESG.json";

export const CONTRACT_ADDRESS = "0xc8011F2C01cF1a02BF8dcA15A949AfA45E5d3FAE";

export interface ESGRecord {
  company: string;
  dataType: string;
  auditor: string;
  timestamp: number;
  verified: boolean;
}

const contractInterface = new Interface(VeriESGArtifact.abi);

export class VeriESGContractService {
  private contractAddress: string;
  private thor: Connex.Thor;
  private vendor: Connex.Vendor;

  constructor(
    thor: Connex.Thor,
    vendor: Connex.Vendor,
    contractAddress: string = CONTRACT_ADDRESS
  ) {
    this.thor = thor;
    this.vendor = vendor;
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

    const functionFragment = contractInterface.getFunction("recordDataHash");
    const data = contractInterface.encodeFunctionData("recordDataHash", [
      dataType,
      dataHash,
      auditor
    ]);

    console.log('📝 Encoded function data:', data);

    const clauses: Connex.Vendor.TxMessage[0][] = [
      {
        to: this.contractAddress,
        value: "0x0",
        data,
        abi: JSON.parse(functionFragment.format("json"))
      }
    ];

    console.log('📋 Transaction clauses:', clauses);

    try {
      const response = await this.vendor
        .sign("tx", clauses)
        .signer(auditor)
        .request();

      console.log('✅ Transaction signed successfully:', response);
      return response.txid;
    } catch (error) {
      console.error('❌ Transaction signing failed:', error);
      throw error;
    }
  }

  async verifyDataHash(dataHash: string, verifier: string): Promise<string> {
    const functionFragment = contractInterface.getFunction("verifyDataHash");
    const data = contractInterface.encodeFunctionData("verifyDataHash", [dataHash]);

    const clauses: Connex.Vendor.TxMessage[0][] = [
      {
        to: this.contractAddress,
        value: "0x0",
        data,
        abi: JSON.parse(functionFragment.format("json"))
      }
    ];

    const response = await this.vendor
      .sign("tx", clauses)
      .signer(verifier)
      .request();

    return response.txid;
  }

  async issueCertificate(
    dataHash: string,
    issuer: string
  ): Promise<{ txid: string; tokenId: number }> {
    const functionFragment = contractInterface.getFunction("issueCertificate");
    const data = contractInterface.encodeFunctionData("issueCertificate", [dataHash]);

    const clauses: Connex.Vendor.TxMessage[0][] = [
      {
        to: this.contractAddress,
        value: "0x0",
        data,
        abi: JSON.parse(functionFragment.format("json"))
      }
    ];

    const response = await this.vendor
      .sign("tx", clauses)
      .signer(issuer)
      .request();

    const receipt = await this.thor.transaction(response.txid).getReceipt();
    
    if (!receipt) {
      throw new Error("Failed to get transaction receipt");
    }

    if (receipt.reverted) {
      throw new Error("issueCertificate transaction reverted");
    }

    const event = receipt.outputs[0]?.events?.find(
      (evt) => evt.topics[0] === contractInterface.getEvent("CertificateIssued").topicHash
    );

    if (!event) {
      throw new Error("CertificateIssued event not found");
    }

    const decoded = contractInterface.decodeEventLog(
      "CertificateIssued",
      event.data,
      event.topics
    );

    return { txid: response.txid, tokenId: Number(decoded.tokenId) };
  }

  async getRecord(dataHash: string): Promise<ESGRecord | null> {
    const functionFragment = contractInterface.getFunction("getRecord");

    const result = await this.thor
      .account(this.contractAddress)
      .method(JSON.parse(functionFragment.format("json")))
      .call(dataHash);

    if (result.reverted || !result.decoded) {
      return null;
    }

    const decoded = result.decoded as any;
    return {
      company: decoded.company || decoded[0],
      dataType: decoded.dataType || decoded[1],
      auditor: decoded.auditor || decoded[2],
      timestamp: Number(decoded.timestamp || decoded[3]),
      verified: decoded.verified ?? decoded[4]
    };
  }

  async getCertificateTokenId(dataHash: string): Promise<number | null> {
    const functionFragment = contractInterface.getFunction("certificateTokenId");

    const result = await this.thor
      .account(this.contractAddress)
      .method(JSON.parse(functionFragment.format("json")))
      .call(dataHash);

    if (result.reverted || !result.decoded) {
      return null;
    }

    return Number(result.decoded[0]);
  }

  async getTokenURI(tokenId: number): Promise<string | null> {
    const functionFragment = contractInterface.getFunction("tokenURI");

    const result = await this.thor
      .account(this.contractAddress)
      .method(JSON.parse(functionFragment.format("json")))
      .call(tokenId);

    if (result.reverted || !result.decoded) {
      return null;
    }

    return result.decoded[0] as string;
  }

  async getBalance(account: string): Promise<number> {
    const functionFragment = contractInterface.getFunction("balanceOf");

    const result = await this.thor
      .account(this.contractAddress)
      .method(JSON.parse(functionFragment.format("json")))
      .call(account);

    if (result.reverted || !result.decoded) {
      return 0;
    }

    return Number(result.decoded[0]);
  }

  async getTokenOfOwnerByIndex(owner: string, index: number): Promise<number | null> {
    const functionFragment = contractInterface.getFunction("tokenOfOwnerByIndex");

    const result = await this.thor
      .account(this.contractAddress)
      .method(JSON.parse(functionFragment.format("json")))
      .call(owner, index);

    if (result.reverted || !result.decoded) {
      return null;
    }

    return Number(result.decoded[0]);
  }

  async getOwnerTokens(owner: string): Promise<number[]> {
    const balance = await this.getBalance(owner);
    const tokens: number[] = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await this.getTokenOfOwnerByIndex(owner, i);
      if (tokenId !== null) {
        tokens.push(tokenId);
      }
    }

    return tokens;
  }
}

export const createVeriESGContract = (thor: Connex.Thor, vendor: Connex.Vendor) => 
  new VeriESGContractService(thor, vendor);

