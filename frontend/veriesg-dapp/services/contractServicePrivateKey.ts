import { Interface } from "ethers";
import { HDNodeWallet, Mnemonic } from "ethers";
import VeriESGArtifact from "../../../veriESG2/artifacts/contracts/VeriESG.sol/VeriESG.json";

export const CONTRACT_ADDRESS = "0xc8011F2C01cF1a02BF8dcA15A949AfA45E5d3FAE";

export interface ESGRecord {
  company: string;
  dataType: string;
  auditor: string;
  timestamp: number;
  verified: boolean;
}

const contractInterface = new Interface(VeriESGArtifact.abi);

export class VeriESGContractServicePrivateKey {
  private contractAddress: string;
  private wallet: HDNodeWallet;
  private rpcUrl: string;

  constructor(
    mnemonic: string,
    contractAddress: string = CONTRACT_ADDRESS,
    rpcUrl: string = "https://testnet.vechain.org"
  ) {
    this.contractAddress = contractAddress;
    this.rpcUrl = rpcUrl;
    
    // Create wallet from mnemonic
    this.wallet = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic));
    
    console.log('🔑 Private key wallet created:', {
      address: this.wallet.address,
      contractAddress: this.contractAddress
    });
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
      contractAddress: this.contractAddress,
      walletAddress: this.wallet.address
    });

    try {
      // Encode function data
      const data = contractInterface.encodeFunctionData("recordDataHash", [
        dataType,
        dataHash,
        auditor
      ]);

      console.log('📝 Encoded function data:', data);

      // Create transaction
      const transaction = {
        to: this.contractAddress,
        value: 0,
        data: data,
        gasLimit: 200000,
        gasPrice: "0x3b9aca00" // 1 gwei
      };

      console.log('📋 Transaction object:', transaction);

      // Sign and send transaction
      const txResponse = await this.wallet.sendTransaction(transaction);
      
      console.log('✅ Transaction sent:', {
        hash: txResponse.hash,
        from: txResponse.from,
        to: txResponse.to
      });

      // Wait for confirmation
      const receipt = await txResponse.wait();
      
      console.log('✅ Transaction confirmed:', {
        hash: receipt.hash,
        status: receipt.status,
        gasUsed: receipt.gasUsed.toString()
      });

      return receipt.hash;
    } catch (error) {
      console.error('❌ Transaction failed:', error);
      throw error;
    }
  }

  async verifyDataHash(dataHash: string): Promise<boolean> {
    try {
      const data = contractInterface.encodeFunctionData("verifyDataHash", [dataHash]);

      const result = await this.wallet.provider.call({
        to: this.contractAddress,
        data
      });

      return result === "0x0000000000000000000000000000000000000000000000000000000000000001";
    } catch (error) {
      console.error('Error verifying data hash:', error);
      return false;
    }
  }

  async issueCertificate(
    dataHash: string,
    recipient: string,
    tokenURI: string
  ): Promise<string> {
    try {
      const data = contractInterface.encodeFunctionData("issueCertificate", [
        dataHash,
        recipient,
        tokenURI
      ]);

      const transaction = {
        to: this.contractAddress,
        value: 0,
        data: data,
        gasLimit: 300000,
        gasPrice: "0x3b9aca00"
      };

      const txResponse = await this.wallet.sendTransaction(transaction);
      const receipt = await txResponse.wait();

      return receipt.hash;
    } catch (error) {
      console.error('Error issuing certificate:', error);
      throw error;
    }
  }

  async getRecord(dataHash: string): Promise<ESGRecord | null> {
    try {
      const data = contractInterface.encodeFunctionData("getRecord", [dataHash]);

      const result = await this.wallet.provider.call({
        to: this.contractAddress,
        data
      });

      const decoded = contractInterface.decodeFunctionResult("getRecord", result);

      if (!decoded || decoded.length === 0) {
        return null;
      }

      return {
        company: decoded[0],
        dataType: decoded[1],
        auditor: decoded[2],
        timestamp: Number(decoded[3]),
        verified: Boolean(decoded[4])
      };
    } catch (error) {
      console.error('Error fetching record:', error);
      return null;
    }
  }

  async getCertificateTokenId(dataHash: string): Promise<number | null> {
    try {
      const data = contractInterface.encodeFunctionData("getCertificateTokenId", [dataHash]);

      const result = await this.wallet.provider.call({
        to: this.contractAddress,
        data
      });

      const decoded = contractInterface.decodeFunctionResult("getCertificateTokenId", result);
      return decoded && decoded.length > 0 ? Number(decoded[0]) : null;
    } catch (error) {
      console.error('Error fetching certificate token ID:', error);
      return null;
    }
  }

  async getTokenURI(tokenId: number): Promise<string | null> {
    try {
      const data = contractInterface.encodeFunctionData("tokenURI", [tokenId]);

      const result = await this.wallet.provider.call({
        to: this.contractAddress,
        data
      });

      const decoded = contractInterface.decodeFunctionResult("tokenURI", result);
      return decoded && decoded.length > 0 ? decoded[0] : null;
    } catch (error) {
      console.error('Error fetching token URI:', error);
      return null;
    }
  }

  async getBalance(account: string): Promise<number> {
    try {
      const data = contractInterface.encodeFunctionData("balanceOf", [account]);

      const result = await this.wallet.provider.call({
        to: this.contractAddress,
        data
      });

      const decoded = contractInterface.decodeFunctionResult("balanceOf", result);
      return decoded && decoded.length > 0 ? Number(decoded[0]) : 0;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return 0;
    }
  }

  async getOwnerTokens(owner: string): Promise<number[]> {
    try {
      const data = contractInterface.encodeFunctionData("getOwnerTokens", [owner]);

      const result = await this.wallet.provider.call({
        to: this.contractAddress,
        data
      });

      const decoded = contractInterface.decodeFunctionResult("getOwnerTokens", result);
      return decoded && decoded.length > 0 && Array.isArray(decoded[0]) 
        ? decoded[0].map((tokenId: any) => Number(tokenId)) 
        : [];
    } catch (error) {
      console.error('Error fetching owner tokens:', error);
      return [];
    }
  }
}

export function createVeriESGContractPrivateKey(
  mnemonic: string,
  contractAddress: string = CONTRACT_ADDRESS,
  rpcUrl: string = "https://testnet.vechain.org"
): VeriESGContractServicePrivateKey {
  return new VeriESGContractServicePrivateKey(mnemonic, contractAddress, rpcUrl);
}
