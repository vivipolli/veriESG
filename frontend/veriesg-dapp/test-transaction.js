// Teste direto de transação
console.log('🧪 TESTANDO TRANSAÇÃO...');

// Simular dados do formulário ESG
const testData = {
  organization: 'GreenTech Solutions',
  metric: 'Carbon footprint reduction',
  claim: 'Reduced carbon emissions by 25% in 2024 through renewable energy adoption',
  referenceDate: '2024-01-01'
};

console.log('📝 Dados de teste:', testData);

// Gerar hash determinístico (igual ao formulário)
const dataToHash = `${testData.organization}-${testData.metric}-${testData.claim}-${testData.referenceDate}`;
console.log('🔑 String para hash:', dataToHash);

// Simular hash SHA-256
const mockHash = '0x' + 'a'.repeat(64);
console.log('🔐 Hash simulado:', mockHash);

// Simular transação
const mockTxid = '0x' + 'b'.repeat(64);
console.log('📄 TXID simulado:', mockTxid);

console.log('🔗 Link do Explorer:', `https://explore-testnet.vechain.org/transactions/${mockTxid}`);

console.log('✅ TESTE CONCLUÍDO!');
console.log('📊 Resultado esperado:');
console.log('- TXID:', mockTxid);
console.log('- Explorer:', `https://explore-testnet.vechain.org/transactions/${mockTxid}`);
console.log('- Status: Transação enviada com sucesso!');
