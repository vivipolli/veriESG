// TESTE REAL COM NAVEGADOR - INTERAÇÃO COM CONTRATO
console.log('🔥 INICIANDO TESTE REAL COM CONTRATO...');

// Abrir navegador para testar
const { exec } = require('child_process');

console.log('🌐 Abrindo navegador para testar transação...');
exec('xdg-open http://localhost:3000/verify', (error, stdout, stderr) => {
  if (error) {
    console.log('❌ Erro ao abrir navegador:', error);
    return;
  }
  console.log('✅ Navegador aberto!');
  console.log('');
  console.log('📋 INSTRUÇÕES PARA TESTE REAL:');
  console.log('1. Conecte sua carteira VeWorld');
  console.log('2. Preencha o formulário ESG:');
  console.log('   - Organization: Test Company');
  console.log('   - Metric: Carbon Footprint');
  console.log('   - Claim: Reduced emissions by 25%');
  console.log('   - Reference Date: 2024-01-01');
  console.log('3. Clique em "Submit ESG Claim"');
  console.log('4. Assine a transação na carteira');
  console.log('5. Copie o TXID que aparecer no alert');
  console.log('');
  console.log('🎯 RESULTADO ESPERADO:');
  console.log('- TXID real da VeChain testnet');
  console.log('- Link do explorer funcionando');
  console.log('- Confirmação na blockchain');
});
