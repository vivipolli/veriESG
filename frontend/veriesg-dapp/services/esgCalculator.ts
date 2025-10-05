export function calculateVerificationScore(claim: string, externalValue: number) {
  const claimedValue = Number.parseFloat(claim);
  if (Number.isNaN(claimedValue) || claimedValue <= 0) {
    return {
      score: 0,
      result: "Questionable" as "Valid" | "Questionable",
    };
  }

  const maxValue = Math.max(claimedValue, externalValue);
  if (maxValue === 0) {
    return {
      score: 0,
      result: "Questionable",
    };
  }

  const ratio = Math.min(claimedValue, externalValue) / maxValue;
  const score = Math.max(0, Math.min(1, ratio));

  return {
    score,
    result: score >= 0.8 ? "Valid" : "Questionable",
  };
}

