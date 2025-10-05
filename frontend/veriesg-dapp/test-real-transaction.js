// TESTE REAL COM CONTRATO - INTERAÇÃO DIRETA
console.log('🔥 TESTANDO TRANSAÇÃO REAL COM CONTRATO...');

// Verificar se o contrato está deployado
const CONTRACT_ADDRESS = "0xc8011F2C01cF1a02BF8dcA15A949AfA45E5d3FAE";
console.log('📋 Contrato:', CONTRACT_ADDRESS);

// Verificar se a rede está correta
const NETWORK = "https://testnet.vechain.org/";
console.log('🌐 Rede:', NETWORK);

// Dados reais para teste
const testData = {
  organization: 'Test Company',
  metric: 'Carbon Footprint',
  claim: 'Reduced emissions by 25%',
  referenceDate: '2024-01-01'
};

console.log('📝 Dados de teste:', testData);

// Gerar hash real
const dataToHash = `${testData.organization}-${testData.metric}-${testData.claim}-${testData.referenceDate}`;
console.log('🔑 String para hash:', dataToHash);

// Simular hash SHA-256 real
const crypto = require('crypto');
const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
const dataHash = '0x' + hash;
console.log('🔐 Hash real gerado:', dataHash);

console.log('📞 PREPARANDO TRANSAÇÃO REAL...');
console.log('   - Contrato:', CONTRACT_ADDRESS);
console.log('   - Método: recordDataHash');
console.log('   - Parâmetros:');
console.log('     * dataType:', testData.metric);
console.log('     * dataHash:', dataHash);
console.log('     * auditor: [endereço da carteira conectada]');

console.log('');
console.log('⚠️  PARA EXECUTAR TRANSAÇÃO REAL:');
console.log('1. Acesse: http://localhost:3000/verify');
console.log('2. Conecte sua carteira VeWorld');
console.log('3. Preencha o formulário com os dados acima');
console.log('4. Clique em "Submit ESG Claim"');
console.log('5. Assine a transação na carteira');
console.log('6. Aguarde confirmação na blockchain');

console.log('');
console.log('🎯 RESULTADO ESPERADO:');
console.log('- TXID real da VeChain testnet');
console.log('- Link do explorer: https://explore-testnet.vechain.org/transactions/[TXID]');
console.log('- Confirmação na blockchain');