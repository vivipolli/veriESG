"use client";

import { useMemo } from "react";
import { createVeriESGContractDAppKit, ESGRecord, CONTRACT_ADDRESS } from "@/services/contractServiceDAppKit";
import { useWallet as useVeChainWallet, useThor } from "@vechain/dapp-kit-react";

type UseContractReturn = {
  getRecord: (dataHash: string) => Promise<ESGRecord | null>;
  getCertificateTokenId: (dataHash: string) => Promise<number | null>;
  getTokenURI: (tokenId: number) => Promise<string | null>;
  getBalance: (account: string) => Promise<number>;
  getOwnerTokens: (owner: string) => Promise<number[]>;
  
  recordDataHash: (dataType: string, dataHash: string, auditor: string) => Promise<string>;
  verifyDataHash: (dataHash: string, verifier: string) => Promise<string>;
  issueCertificate: (dataHash: string, issuer: string) => Promise<{ txid: string; tokenId: number }>;
  
  contractAddress: string;
  isConnected: boolean;
  isReady: boolean;
};

export default function useContract(): UseContractReturn {
  const { account, requestTransaction } = useVeChainWallet();
  const thor = useThor();


  const contract = useMemo(() => {
    if (!thor || !requestTransaction) {
      return null;
    }
    
    try {
      return createVeriESGContractDAppKit(
        thor as any,
        { signTx: requestTransaction },
      );
    } catch (error) {
      console.error('❌ Failed to create contract instance:', error);
      return null;
    }
  }, [thor, requestTransaction]);

  return useMemo(() => ({
    getRecord: async (dataHash: string) => {
      if (!contract) throw new Error("Contract not initialized");
      return contract.getRecord(dataHash);
    },
    getCertificateTokenId: async (dataHash: string) => {
      if (!contract) throw new Error("Contract not initialized");
      return contract.getCertificateTokenId(dataHash);
    },
    getTokenURI: async (tokenId: number) => {
      if (!contract) throw new Error("Contract not initialized");
      return contract.getTokenURI(tokenId);
    },
    getBalance: async (account: string) => {
      if (!contract) throw new Error("Contract not initialized");
      return contract.getBalance(account);
    },
    getOwnerTokens: async (owner: string) => {
      if (!contract) throw new Error("Contract not initialized");
      return contract.getOwnerTokens(owner);
    },
    
    recordDataHash: async (dataType: string, dataHash: string, auditor: string) => {
      if (!account) throw new Error("Wallet not connected");
      if (!contract) throw new Error("Contract not initialized");
      return contract.recordDataHash(dataType, dataHash, account);
    },
    verifyDataHash: async (dataHash: string, verifier: string) => {
      if (!account) throw new Error("Wallet not connected");
      if (!contract) throw new Error("Contract not initialized");
      return contract.verifyDataHash(dataHash, verifier);
    },
    issueCertificate: async (dataHash: string, issuer: string) => {
      if (!account) throw new Error("Wallet not connected");
      if (!contract) throw new Error("Contract not initialized");
      return contract.issueCertificate(dataHash, issuer);
    },
    
    contractAddress: CONTRACT_ADDRESS,
    isConnected: !!account,
    isReady: !!contract,
  }), [account, contract]);
}

