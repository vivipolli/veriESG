const { Connex } = require('@vechain/connex');
const { HDNodeWallet, Mnemonic } = require("ethers");
const { Interface } = require("ethers");

// Import the contract ABI
const VeriESGArtifact = require("../../veriESG2/artifacts/contracts/VeriESG.sol/VeriESG.json");

const CONTRACT_ADDRESS = "0xc8011F2C01cF1a02BF8dcA15A949AfA45E5d3FAE";
const MNEMONIC = "attract grain chapter jungle planet lecture hover brave fetch bubble strike eternal";
const RPC_URL = "https://vethor-node-test.vechaindev.com";

async function testContractInteraction() {
  console.log('🧪 Starting VeChain contract interaction test...');
  
  try {
    // Create wallet from mnemonic
    const wallet = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(MNEMONIC));
    console.log('🔑 Wallet created:', {
      address: wallet.address,
      contractAddress: CONTRACT_ADDRESS
    });

    // Create Connex instance
    const connex = new Connex({
      node: RPC_URL,
      network: 'test'
    });

    console.log('🌐 Connex connected to VeChain testnet');

    // Create contract interface
    const contractInterface = new Interface(VeriESGArtifact.abi);
    
    // Test data
    const dataType = "Carbon Footprint";
    const dataHash = "0x" + require('crypto').randomBytes(32).toString('hex');
    const auditor = wallet.address;

    console.log('📊 Test data:', {
      dataType,
      dataHash,
      auditor
    });

    // Encode function data
    const data = contractInterface.encodeFunctionData("recordDataHash", [
      dataType,
      dataHash,
      auditor
    ]);

    console.log('📝 Encoded function data:', data);

    // Create transaction clause
    const clause = {
      to: CONTRACT_ADDRESS,
      value: 0,
      data: data,
      gas: 200000
    };

    console.log('📋 Transaction clause:', clause);

    // Sign and send transaction using Connex
    console.log('🚀 Sending transaction via Connex...');
    
    const tx = connex.vendor.sign('tx', [clause])
      .comment('Record ESG data')
      .request();

    // Sign the transaction with private key
    const signedTx = await wallet.signTransaction(tx);
    
    console.log('✅ Transaction signed:', signedTx);

    // Send the transaction
    const result = await connex.vendor.send('tx', signedTx);
    
    console.log('✅ Transaction sent:', {
      txid: result.txid,
      signer: result.signer
    });

    // Wait for confirmation
    console.log('⏳ Waiting for confirmation...');
    const receipt = await connex.thor.transaction(result.txid).getReceipt();
    
    console.log('✅ Transaction confirmed:', {
      txid: result.txid,
      gasUsed: receipt.gasUsed,
      gasPayer: receipt.gasPayer,
      reverted: receipt.reverted
    });

    // Test reading the record
    console.log('📖 Testing record retrieval...');
    const readData = contractInterface.encodeFunctionData("getRecord", [dataHash]);
    
    const callResult = await connex.thor.account(CONTRACT_ADDRESS).method({
      abi: VeriESGArtifact.abi.find(item => item.name === "getRecord"),
      data: readData
    }).call();

    console.log('📋 Record retrieved:', {
      company: callResult.data[0],
      dataType: callResult.data[1],
      auditor: callResult.data[2],
      timestamp: Number(callResult.data[3]),
      verified: Boolean(callResult.data[4])
    });

    console.log('🎉 Test completed successfully!');
    console.log('🔗 Transaction hash:', result.txid);
    console.log('🔗 VeChain Explorer:', `https://explore-testnet.vechain.org/transactions/${result.txid}`);

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testContractInteraction();
