export interface VerificationResult {
  score: number;
  discrepancies: string[];
  externalEvidence: Record<string, unknown>;
  updatedAt: string;
}

export async function verifyClaimMock(claim: {
  organization: string;
  metric: string;
  claim: string;
  referenceDate: string;
  externalSource: string;
  requesterAddress?: string;
}): Promise<VerificationResult> {
  console.log('🔍 MOCK Verifying claim:', claim);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Generate mock verification result
  const score = Math.floor(Math.random() * 40) + 60; // 60-100 score
  const discrepancies = score < 80 ? [
    "Minor data inconsistency detected",
    "Source verification pending"
  ] : [];
  
  const externalEvidence = {
    "NASA Climate Data": { confidence: 0.95, lastUpdated: "2024-01-15" },
    "MapBiomas Satellite Imagery": { confidence: 0.88, lastUpdated: "2024-01-14" },
    "Copernicus Environmental Data": { confidence: 0.92, lastUpdated: "2024-01-13" }
  };
  
  console.log('✅ MOCK Verification completed:', { score });
  
  return {
    score,
    discrepancies,
    externalEvidence,
    updatedAt: new Date().toISOString()
  };
}
