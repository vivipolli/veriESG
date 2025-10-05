import { useMemo } from 'react';
import { createVeriESGContractPrivateKey } from '../services/contractServicePrivateKey';

const MNEMONIC = "attract grain chapter jungle planet lecture hover brave fetch bubble strike eternal";

export function useContractPrivateKey() {
  const contract = useMemo(() => {
    try {
      console.log('🔑 Creating private key contract...');
      const contractInstance = createVeriESGContractPrivateKey(MNEMONIC);
      console.log('✅ Private key contract created successfully');
      return contractInstance;
    } catch (error) {
      console.error('❌ Failed to create private key contract:', error);
      return null;
    }
  }, []);

  return {
    contract,
    isReady: !!contract,
    recordDataHash: contract?.recordDataHash.bind(contract),
    verifyDataHash: contract?.verifyDataHash.bind(contract),
    issueCertificate: contract?.issueCertificate.bind(contract),
    getRecord: contract?.getRecord.bind(contract),
    getCertificateTokenId: contract?.getCertificateTokenId.bind(contract),
    getTokenURI: contract?.getTokenURI.bind(contract),
    getBalance: contract?.getBalance.bind(contract),
    getOwnerTokens: contract?.getOwnerTokens.bind(contract)
  };
}
