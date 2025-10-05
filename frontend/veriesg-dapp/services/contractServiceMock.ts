export const CONTRACT_ADDRESS = "0xc8011F2C01cF1a02BF8dcA15A949AfA45E5d3FAE";

export interface ESGRecord {
  company: string;
  dataType: string;
  auditor: string;
  timestamp: number;
  verified: boolean;
}

export class VeriESGContractServiceMock {
  private contractAddress: string;

  constructor(contractAddress: string = CONTRACT_ADDRESS) {
    this.contractAddress = contractAddress;
    console.log('🔑 MOCK VeChain contract created:', { contractAddress });
  }

  async recordDataHash(
    dataType: string,
    dataHash: string,
    auditor: string
  ): Promise<string> {
    console.log('🔗 MOCK ContractService.recordDataHash called:', {
      dataType,
      dataHash,
      auditor,
      contractAddress: this.contractAddress
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock transaction hash
    const mockTxHash = `0x${Math.random().toString(16).substring(2, 66).padEnd(64, '0')}`;
    
    console.log('✅ MOCK Transaction sent! Hash:', mockTxHash);
    console.log('✅ MOCK Transaction confirmed!');
    console.log('🔗 Final hash:', mockTxHash);
    
    return mockTxHash;
  }

  async verifyDataHash(dataHash: string): Promise<boolean> {
    console.log('🔍 MOCK Verifying data hash:', dataHash);
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }

  async issueCertificate(
    dataHash: string,
    recipient: string,
    tokenURI: string
  ): Promise<string> {
    console.log('🎓 MOCK Issuing certificate:', { dataHash, recipient, tokenURI });
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockTxHash = `0x${Math.random().toString(16).substring(2, 66).padEnd(64, '0')}`;
    return mockTxHash;
  }

  async getRecord(dataHash: string): Promise<ESGRecord | null> {
    console.log('📖 MOCK Getting record:', dataHash);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      company: "0xd229214aF491C7A92829541d86Ef5945C4b02557",
      dataType: "Carbon Footprint",
      auditor: "0xd229214aF491C7A92829541d86Ef5945C4b02557",
      timestamp: Math.floor(Date.now() / 1000),
      verified: true
    };
  }

  async getCertificateTokenId(dataHash: string): Promise<number | null> {
    console.log('🎫 MOCK Getting certificate token ID:', dataHash);
    await new Promise(resolve => setTimeout(resolve, 200));
    return Math.floor(Math.random() * 1000) + 1;
  }

  async getTokenURI(tokenId: number): Promise<string | null> {
    console.log('🔗 MOCK Getting token URI:', tokenId);
    await new Promise(resolve => setTimeout(resolve, 200));
    return `https://api.veriesg.com/metadata/${tokenId}`;
  }

  async getBalance(account: string): Promise<number> {
    console.log('💰 MOCK Getting balance:', account);
    await new Promise(resolve => setTimeout(resolve, 150));
    return Math.floor(Math.random() * 10);
  }

  async getOwnerTokens(owner: string): Promise<number[]> {
    console.log('🎫 MOCK Getting owner tokens:', owner);
    await new Promise(resolve => setTimeout(resolve, 200));
    const tokenCount = Math.floor(Math.random() * 5);
    return Array.from({ length: tokenCount }, (_, i) => i + 1);
  }
}

export function createVeriESGContractMock(
  contractAddress: string = CONTRACT_ADDRESS
): VeriESGContractServiceMock {
  return new VeriESGContractServiceMock(contractAddress);
}
