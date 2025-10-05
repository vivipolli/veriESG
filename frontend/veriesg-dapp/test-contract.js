// Teste direto do contrato
console.log('🧪 Testing contract integration...');

// Simular dados de teste
const testData = {
  organization: 'Test Company',
  metric: 'Carbon Footprint',
  claim: 'Reduced emissions by 25%',
  referenceDate: '2024-01-01'
};

// Gerar hash determinístico
const dataToHash = `${testData.organization}-${testData.metric}-${testData.claim}-${testData.referenceDate}`;
console.log('📝 Data to hash:', dataToHash);

// Simular hash (em produção seria SHA-256)
const mockHash = '0x' + 'a'.repeat(64);
console.log('🔑 Mock hash:', mockHash);

console.log('✅ Test data prepared:', {
  organization: testData.organization,
  metric: testData.metric,
  dataHash: mockHash,
  expectedTxid: '0x' + 'b'.repeat(64)
});

console.log('🚀 Ready to test transaction!');
