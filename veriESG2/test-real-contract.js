const { ethers } = require("hardhat");

async function testRealContract() {
  console.log('🧪 Testing REAL contract interaction...');
  
  try {
    // Get the signer (your wallet)
    const [signer] = await ethers.getSigners();
    console.log('🔑 Using wallet:', signer.address);
    
    // Get the contract
    const contractAddress = "0xc8011F2C01cF1a02BF8dcA15A949AfA45E5d3FAE";
    const VeriESG = await ethers.getContractFactory("VeriESG");
    const contract = VeriESG.attach(contractAddress);
    
    console.log('📋 Contract attached to:', contractAddress);
    
    // First, add the auditor as a verifier (required by the contract)
    console.log('🔧 Adding auditor as verifier...');
    const addVerifierTx = await contract.addVerifier(signer.address, {
      gasLimit: 100000
    });
    await addVerifierTx.wait();
    console.log('✅ Auditor added as verifier');
    
    // Test data
    const dataType = "Carbon Footprint Test";
    const dataHash = ethers.keccak256(ethers.toUtf8Bytes("test-data-" + Date.now()));
    const auditor = signer.address;
    
    console.log('📊 Test data:', {
      dataType,
      dataHash,
      auditor
    });
    
    // Call recordDataHash
    console.log('🚀 Calling recordDataHash...');
    const tx = await contract.recordDataHash(dataType, dataHash, auditor, {
      gasLimit: 200000
    });
    
    console.log('✅ Transaction sent! Hash:', tx.hash);
    
    // Wait for confirmation
    console.log('⏳ Waiting for confirmation...');
    const receipt = await tx.wait();
    
    console.log('✅ Transaction confirmed!');
    console.log('🔗 Final hash:', receipt.hash);
    console.log('🔗 Gas used:', receipt.gasUsed.toString());
    console.log('🔗 Block number:', receipt.blockNumber);
    console.log('🔗 VeChain Explorer: https://explore-testnet.vechain.org/transactions/' + receipt.hash);
    
    // Test reading the record
    console.log('📖 Testing record retrieval...');
    const record = await contract.getRecord(dataHash);
    
    console.log('📋 Record retrieved:', {
      company: record[0],
      dataType: record[1],
      auditor: record[2],
      timestamp: Number(record[3]),
      verified: Boolean(record[4])
    });
    
    console.log('🎉 REAL TEST COMPLETED SUCCESSFULLY!');
    console.log('🔗 Transaction hash:', receipt.hash);
    
    return receipt.hash;
    
  } catch (error) {
    console.error('❌ REAL TEST FAILED:', error);
    throw error;
  }
}

// Run the test
testRealContract()
  .then(hash => {
    console.log('\n🎉 SUCCESS! Real transaction hash:', hash);
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 FAILED:', error.message);
    process.exit(1);
  });
