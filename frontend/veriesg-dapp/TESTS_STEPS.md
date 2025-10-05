# Manual Testing Steps - VeriESG Frontend

## Prerequisites
- VeWorld wallet installed or WalletConnect compatible wallet
- Testnet VET tokens for gas fees
- Application running on `http://localhost:3000`

## 1. Initial Setup & Wallet Connection

### Step 1.1: Access the Application
1. Open browser and navigate to `http://localhost:3000`
2. Verify the application loads with the VeriESG interface
3. Check that the navbar shows "Connect Wallet" button

### Step 1.2: Connect Wallet
1. Click "Connect Wallet" button in the navbar
2. Select your preferred wallet (VeWorld or WalletConnect)
3. Complete the connection process
4. Verify the wallet address appears in the navbar
5. **Expected Result**: Wallet connected, address displayed, "Connect Wallet" changes to wallet address

## 2. Testing the Verify Route (`/verify`)

### Step 2.1: Navigate to Verify Page
1. Click on "Verify" in the navigation or go to `http://localhost:3000/verify`
2. Verify the ESG form is displayed with all required fields

### Step 2.2: Fill ESG Form - Example Data

#### Example 1: Carbon Reduction
```
Organization: "GreenTech Solutions"
ESG Metric: "Carbon footprint reduction"
Claim Details: "Reduced carbon emissions by 25% in 2024 through renewable energy adoption and energy efficiency measures"
Reference Date: "2024-12-01"
External Data Source: "NASA EOSDIS"
```

#### Example 2: Renewable Energy
```
Organization: "SolarCorp Energy"
ESG Metric: "Renewable energy generation"
Claim Details: "Generated 50MW of clean solar energy in Q4 2024, powering 15,000 homes and reducing CO2 emissions by 30,000 tons"
Reference Date: "2024-11-15"
External Data Source: "Copernicus"
```

#### Example 3: Forest Conservation
```
Organization: "EcoForest Corp"
ESG Metric: "Tree planting initiative"
Claim Details: "Planted 10,000 native trees in Amazon rainforest restoration project, creating 50 hectares of new forest cover"
Reference Date: "2024-10-20"
External Data Source: "MapBiomas"
```

#### Example 4: Water Conservation
```
Organization: "AquaSave Industries"
ESG Metric: "Water usage efficiency"
Claim Details: "Reduced water consumption by 40% through advanced recycling systems and smart irrigation technology"
Reference Date: "2024-09-30"
External Data Source: "NASA EOSDIS"
```

#### Example 5: Waste Reduction
```
Organization: "CircularTech Ltd"
ESG Metric: "Waste diversion rate"
Claim Details: "Achieved 95% waste diversion from landfills through comprehensive recycling and circular economy initiatives"
Reference Date: "2024-08-15"
External Data Source: "Copernicus"
```

### Step 2.3: Submit for Verification
1. Click "Verify and record" button
2. **Expected Result**: 
   - Button shows "Verifying claim..." (Layer 3 verification)
   - Then shows "Recording on VeChain..." (Blockchain recording)
   - Success message appears
   - Form resets to initial state

### Step 2.4: Verify Blockchain Recording
1. Check browser console for logs showing:
   - Data hash generated
   - Transaction ID (txid)
   - Contract interaction details
2. **Expected Result**: Console shows successful blockchain recording with transaction details

## 3. Testing the Dashboard Route (`/dashboard`)

### Step 3.1: Navigate to Dashboard
1. Click on "Dashboard" in the navigation or go to `http://localhost:3000/dashboard`
2. Verify the dashboard loads with ESG records

### Step 3.2: View ESG Records
1. Look for the ESG card created in the previous step
2. **Expected Result**: ESG card displays:
   - Organization: "GreenTech Solutions"
   - Metric: "Carbon footprint reduction"
   - Claim: "Reduced carbon emissions by 25% in 2024..."
   - Status: "verified" or "pending"
   - Verification score: 85-95%
   - Timestamp of submission

### Step 3.3: Check On-Chain Data
1. Look for the "On-Chain Record" section in the ESG card
2. **Expected Result**: Shows:
   - Company address (truncated)
   - Auditor address (truncated)
   - Verified status: "Yes" or "No"
   - Certificate ID (if issued)

## 4. Advanced Testing Scenarios

### Step 4.1: Multiple Records Test
1. Go back to `/verify`
2. Submit additional ESG records using the examples above
3. Try different combinations:
   - Different organizations
   - Various ESG metrics
   - Different external data sources
   - Various reference dates
4. **Expected Result**: All records appear in dashboard with unique data

### Step 4.2: Certificate Issuance Test
1. In dashboard, look for records with "verified" status
2. Check if certificate token ID appears
3. **Expected Result**: Verified records show certificate token ID

### Step 4.3: Error Handling Test
1. Try submitting form with empty fields
2. **Expected Result**: Form validation prevents submission
3. Try submitting without wallet connected
4. **Expected Result**: Error message about wallet connection

## 5. Blockchain Verification (Optional)

### Step 5.1: Check VeChain Explorer
1. Copy the transaction ID from console logs
2. Visit VeChain testnet explorer: `https://explore-testnet.vechain.org/`
3. Search for the transaction ID
4. **Expected Result**: Transaction visible on blockchain explorer

### Step 5.2: Verify Contract Interaction
1. In the explorer, check the transaction details
2. Look for contract method calls (recordDataHash, verifyDataHash, issueCertificate)
3. **Expected Result**: Contract interactions visible in transaction details

## 6. Expected Console Logs

### Successful Verification:
```
ESG data recorded on VeChain: {
  dataHash: "0x...",
  metric: "Carbon footprint reduction",
  organization: "GreenTech Solutions",
  auditor: "0x..."
}
```

### Contract Data Fetch:
```
Contract data fetched: {
  company: "0x...",
  auditor: "0x...",
  verified: true,
  timestamp: 1234567890
}
```

## 7. Troubleshooting

### Common Issues:
1. **Wallet not connecting**: Check if VeWorld is installed or WalletConnect is working
2. **Transaction fails**: Ensure you have testnet VET for gas fees
3. **Contract not ready**: Wait for `isReady` to be true before submitting
4. **Data not appearing**: Check if the transaction was confirmed on blockchain

### Debug Information:
- Check browser console for detailed logs
- Verify wallet connection status
- Check contract readiness status
- Monitor transaction confirmation

## 8. Success Criteria

✅ **Wallet Connection**: Wallet connects successfully and address is displayed
✅ **Form Submission**: ESG form submits without errors
✅ **Blockchain Recording**: Transaction is recorded on VeChain testnet
✅ **Dashboard Display**: Records appear in dashboard with correct information
✅ **On-Chain Data**: Contract data is fetched and displayed correctly
✅ **Certificate Issuance**: Verified records show certificate token IDs