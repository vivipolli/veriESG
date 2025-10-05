"use client";

import { useState } from "react";
import { useContractPrivateKey } from "@/hooks/useContractPrivateKey";

export default function ContractTester() {
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { isReady, recordDataHash } = useContractPrivateKey();

  const testRecordDataHash = async () => {
    if (!isReady || !recordDataHash) {
      setError("Contract not ready");
      return;
    }

    setIsTesting(true);
    setError(null);
    setResult(null);

    try {
      console.log('🧪 Starting contract test...');
      
      // Generate test data
      const dataType = "Carbon Footprint Test";
      const dataHash = "0x" + Array.from({length: 32}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
      const auditor = "0xd229214aF491C7A92829541d86Ef5945C4b02557"; // Your wallet address
      
      console.log('📊 Test data:', { dataType, dataHash, auditor });
      
      // Call recordDataHash
      const txHash = await recordDataHash(dataType, dataHash, auditor);
      
      console.log('✅ Transaction successful!', txHash);
      setResult(txHash);
      
    } catch (error: any) {
      console.error('❌ Test failed:', error);
      setError(error.message || 'Unknown error');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Contract Tester</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Status: {isReady ? "✅ Ready" : "❌ Not Ready"}
        </p>
      </div>
      
      <button
        onClick={testRecordDataHash}
        disabled={!isReady || isTesting}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
      >
        {isTesting ? "Testing..." : "Test recordDataHash"}
      </button>
      
      {result && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <h3 className="font-bold text-green-800">✅ Success!</h3>
          <p className="text-sm text-green-700">Transaction Hash:</p>
          <p className="font-mono text-xs break-all">{result}</p>
          <a 
            href={`https://explore-testnet.vechain.org/transactions/${result}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            View on VeChain Explorer
          </a>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
          <h3 className="font-bold text-red-800">❌ Error</h3>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
