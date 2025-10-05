const { HDNodeWallet, Mnemonic, JsonRpcProvider } = require("ethers");
const { Interface } = require("ethers");

// Import the contract ABI
const VeriESGArtifact = require("../../veriESG2/artifacts/contracts/VeriESG.sol/VeriESG.json");

const CONTRACT_ADDRESS = "0xc8011F2C01cF1a02BF8dcA15A949AfA45E5d3FAE";
const MNEMONIC = "attract grain chapter jungle planet lecture hover brave fetch bubble strike eternal";
const RPC_URL = "https://vethor-node-test.vechaindev.com";

async function testContractInteraction() {
  console.log('🧪 Starting contract interaction test...');
  
  try {
    // Create provider
    const provider = new JsonRpcProvider(RPC_URL);
    
    // Create wallet from mnemonic and connect to provider
    const wallet = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(MNEMONIC)).connect(provider);
    console.log('🔑 Wallet created:', {
      address: wallet.address,
      contractAddress: CONTRACT_ADDRESS
    });

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

    // Create transaction
    const transaction = {
      to: CONTRACT_ADDRESS,
      value: 0,
      data: data,
      gasLimit: 200000,
      gasPrice: "0x3b9aca00" // 1 gwei
    };

    console.log('📋 Transaction object:', transaction);

    // Send transaction
    console.log('🚀 Sending transaction...');
    const txResponse = await wallet.sendTransaction(transaction);
    
    console.log('✅ Transaction sent:', {
      hash: txResponse.hash,
      from: txResponse.from,
      to: txResponse.to
    });

    // Wait for confirmation
    console.log('⏳ Waiting for confirmation...');
    const receipt = await txResponse.wait();
    
    console.log('✅ Transaction confirmed:', {
      hash: receipt.hash,
      status: receipt.status,
      gasUsed: receipt.gasUsed.toString(),
      blockNumber: receipt.blockNumber
    });

    // Test reading the record
    console.log('📖 Testing record retrieval...');
    const readData = contractInterface.encodeFunctionData("getRecord", [dataHash]);
    
    const result = await wallet.provider.call({
      to: CONTRACT_ADDRESS,
      data: readData
    });

    const decoded = contractInterface.decodeFunctionResult("getRecord", result);
    
    console.log('📋 Record retrieved:', {
      company: decoded[0],
      dataType: decoded[1],
      auditor: decoded[2],
      timestamp: Number(decoded[3]),
      verified: Boolean(decoded[4])
    });

    console.log('🎉 Test completed successfully!');
    console.log('🔗 Transaction hash:', receipt.hash);
    console.log('🔗 VeChain Explorer:', `https://explore-testnet.vechain.org/transactions/${receipt.hash}`);

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testContractInteraction();