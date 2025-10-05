"use client";

import ESGForm from "@/components/ESGForm";
import useVerification from "@/hooks/useVerification";
import { Sparkles, ShieldCheck, AlertOctagon, CircleCheck, Clock } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const statusByScore = (score: number) => {
  if (score >= 80) return { status: "validated" as const, label: "High confidence" };
  if (score >= 50) return { status: "pending" as const, label: "Requires auditor review" };
  return { status: "rejected" as const, label: "Needs revisions" };
};

export default function VerifyPage() {
  const { verify, isLoading, result, error } = useVerification();

  const handleSubmit = async (values: Parameters<typeof verify>[0]) => {
    await verify(values);
  };

  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col gap-8">
        <header className="glass-panel flex flex-col gap-4 p-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">
            <ShieldCheck className="h-4 w-4 text-[var(--color-secondary)]" />
            Submit ESG Claim
          </span>
          <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Record a verifiable ESG attestation</h1>
          <p className="text-sm text-[var(--color-muted)]">
            Layer 2 ingestion validates your claim with NASA, MapBiomas, or Copernicus before minting a Layer 4 certification NFT anchored on VeChain.
          </p>
        </header>
        <ESGForm onSubmit={handleSubmit} isSubmitting={isLoading} />
      </div>

      <aside className="glass-panel flex flex-col gap-6 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-foreground)]">Verification insights</h2>
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-muted)]">Layer 3 intelligence</p>
          </div>
          <Sparkles className="h-5 w-5 text-[var(--color-primary)]" />
        </div>

        {error && (
          <div className="rounded-2xl border border-[rgba(255,77,109,0.2)] bg-[rgba(255,77,109,0.08)] px-4 py-3 text-sm text-[var(--color-danger)]">
            <div className="flex items-center gap-2">
              <AlertOctagon className="h-4 w-4" />
              {error}
            </div>
          </div>
        )}

        {result ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">Confidence score</span>
                <span className="text-4xl font-bold text-[var(--color-secondary)]">{result.score}%</span>
              </div>
              <StatusBadge status={statusByScore(result.score).status}>{statusByScore(result.score).label}</StatusBadge>
            </div>
            <div className="rounded-2xl border border-white/40 bg-white/70 p-4">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">Discrepancies</span>
              {result.discrepancies.length > 0 ? (
                <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm text-[var(--color-danger)]">
                  {result.discrepancies.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 flex items-center gap-2 text-sm text-[var(--color-success)]">
                  <CircleCheck className="h-4 w-4" />
                  No material discrepancies detected
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-[var(--color-muted)]">
              <Clock className="h-4 w-4" />
              Last updated {new Date().toLocaleString()}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-sm text-[var(--color-muted)]">
            <p>
              Submit a claim to launch verification. We will pull authoritative data, compute a confidence score, and anchor the proof on-chain.
            </p>
            <div className="rounded-2xl border border-white/40 bg-white/70 p-4">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">What to expect</span>
              <ul className="mt-3 flex list-disc flex-col gap-2 pl-5">
                <li>Layer 2 data normalization and integrity checks</li>
                <li>Layer 3 scoring with anomaly detection</li>
                <li>Layer 4 NFT attestation on VeChain</li>
              </ul>
            </div>
          </div>
        )}
      </aside>
    </section>
  );
}

