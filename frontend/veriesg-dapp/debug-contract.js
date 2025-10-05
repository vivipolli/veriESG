// Debug do contrato
console.log('🔍 Debugging contract integration...');

// Verificar se os hooks estão funcionando
console.log('📋 Available hooks:');
console.log('- useWallet: should return { account, requestTransaction }');
console.log('- useThor: should return thor object');
console.log('- useContract: should return { isReady, recordDataHash }');

// Verificar se o contrato está sendo criado
console.log('🏗️ Contract creation:');
console.log('- thor: should be available from useThor()');
console.log('- signer: should be { signTx: requestTransaction }');
console.log('- contract: should be VeriESGContractServiceDAppKit instance');

// Verificar se a transação está sendo chamada
console.log('💳 Transaction flow:');
console.log('1. recordDataHash() called');
console.log('2. contractInterface.encodeFunctionData()');
console.log('3. clauses array created');
console.log('4. signer.signTx() called');
console.log('5. response.txid returned');

console.log('✅ Debug setup complete!');
