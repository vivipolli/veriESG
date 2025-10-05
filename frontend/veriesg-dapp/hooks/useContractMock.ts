import { useMemo } from 'react';
import { createVeriESGContractMock } from '../services/contractServiceMock';

export function useContractMock() {
  const contract = useMemo(() => {
    console.log('🔑 Creating MOCK VeChain contract...');
    const contractInstance = createVeriESGContractMock();
    console.log('✅ MOCK VeChain contract created successfully');
    return contractInstance;
  }, []);

  return {
    contract,
    isReady: true, // Always ready for mock
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
