import { NextRequest } from "next/server";
import { calculateVerificationScore } from "@/services/esgCalculator";
import { fetchExternalData } from "../utils/externalSources";

type VerifyPayload = {
  organization: string;
  metric: string;
  claim: string;
  referenceDate: string;
  externalSource: "nasa" | "mapbiomas" | "copernicus";
  requesterAddress?: string;
};

export async function handleVerify(request: NextRequest) {
  const payload = (await request.json()) as VerifyPayload;

  console.log("Verification request received:", {
    organization: payload.organization,
    metric: payload.metric,
    requesterAddress: payload.requesterAddress,
    externalSource: payload.externalSource
  });

  const external = await fetchExternalData(payload.externalSource, {
    metric: payload.metric,
    referenceDate: payload.referenceDate,
  });

  const score = calculateVerificationScore(payload.claim, external.value);

  const result = {
    score: Math.round(score.score * 100),
    discrepancies: score.result === "Questionable" ? ["Variance above threshold"] : [],
    externalEvidence: external.metadata,
    updatedAt: new Date().toISOString(),
    requesterAddress: payload.requesterAddress,
  };

  console.log("Verification result:", result);
  return result;
}

