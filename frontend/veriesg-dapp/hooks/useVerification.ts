"use client";

import { useCallback, useState } from "react";
import { verifyClaimMock } from "@/services/verifierServiceMock";

type VerificationPayload = {
  organization: string;
  metric: string;
  claim: string;
  referenceDate: string;
  externalSource: string;
  requesterAddress?: string;
};

export type VerificationResult = {
  score: number;
  discrepancies: string[];
  externalEvidence: Record<string, unknown>;
  updatedAt: string;
};

export default function useVerification() {
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verify = useCallback(async (payload: VerificationPayload) => {
    setLoading(true);
    setError(null);

    try {
      const data = await verifyClaimMock(payload);
      setResult(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    isLoading,
    result,
    error,
    verify,
  };
}

