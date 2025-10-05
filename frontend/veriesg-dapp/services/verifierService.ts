import apiClient from "./apiClient";

export type VerificationRequest = {
  organization: string;
  metric: string;
  claim: string;
  referenceDate: string;
  externalSource: string;
  requesterAddress?: string;
};

export type VerificationResponse = {
  score: number;
  discrepancies: string[];
  externalEvidence: Record<string, unknown>;
  updatedAt: string;
};

export async function verifyClaim(payload: VerificationRequest) {
  const { data } = await apiClient.post<VerificationResponse>('/verify', payload);
  return data;
}

