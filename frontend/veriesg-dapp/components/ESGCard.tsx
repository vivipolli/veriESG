import { Sparkle, Gauge, CheckCircle2, AlertTriangle, Clock, Link2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import useContract from "@/hooks/useContract";
import { useState, useEffect } from "react";

type ESGCardProps = {
  organization: string;
  metric: string;
  claim: string;
  status: "pending" | "verified" | "flagged";
  score: number;
  timestamp: string;
  dataHash?: string;
};

const statusNarrative: Record<ESGCardProps["status"], string> = {
  pending: "Awaiting layer 3 verification",
  verified: "Attested on-chain",
  flagged: "Requires auditor review",
};

const statusIcon: Record<ESGCardProps["status"], React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  verified: <CheckCircle2 className="h-4 w-4" />,
  flagged: <AlertTriangle className="h-4 w-4" />,
};

export default function ESGCard({
  organization,
  metric,
  claim,
  status,
  score,
  timestamp,
  dataHash,
}: ESGCardProps) {
  const { getRecord, getCertificateTokenId, isReady } = useContract();
  const [contractData, setContractData] = useState<{
    company?: string;
    auditor?: string;
    verified?: boolean;
  } | null>(null);
  const [certificateTokenId, setCertificateTokenId] = useState<number | null>(null);

  useEffect(() => {
    if (dataHash && isReady) {
      const fetchContractData = async () => {
        try {
          const record = await getRecord(dataHash);
          const tokenId = await getCertificateTokenId(dataHash);
          setContractData(record);
          setCertificateTokenId(tokenId);
        } catch (error) {
          console.error('Error fetching contract data:', error);
        }
      };
      
      fetchContractData();
    }
  }, [dataHash, isReady, getRecord, getCertificateTokenId]);
  return (
    <article className="relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-white/35 bg-white/65 p-7 shadow-card backdrop-blur-xl">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[rgba(155,93,229,0.16)]" />

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-[0.32em] text-[var(--color-muted)]">Organization</span>
          <h3 className="text-xl font-semibold text-[var(--color-foreground)]">{organization}</h3>
        </div>
        <StatusBadge status={status} icon={statusIcon[status]}>
          {statusNarrative[status]}
        </StatusBadge>
      </header>

      <section className="relative z-10 grid gap-4 text-sm text-[var(--color-muted)] md:grid-cols-2">
        <div className="rounded-2xl border border-white/40 bg-white/60 p-4">
          <div className="mb-2 inline-flex items-center gap-2 text-[var(--color-foreground)]">
            <Gauge className="h-4 w-4 text-[var(--color-secondary)]" />
            <span className="font-semibold uppercase tracking-[0.18em]">Metric</span>
          </div>
          <p className="text-base text-[var(--color-foreground)]">{metric}</p>
        </div>

        <div className="rounded-2xl border border-white/40 bg-white/60 p-4">
          <div className="mb-2 inline-flex items-center gap-2 text-[var(--color-foreground)]">
            <Sparkle className="h-4 w-4 text-[var(--color-primary)]" />
            <span className="font-semibold uppercase tracking-[0.18em]">Claim</span>
          </div>
          <p className="text-base text-[var(--color-foreground)]">{claim}</p>
        </div>
      </section>

      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[var(--surface-200)] px-5 py-4 text-xs uppercase text-[var(--color-muted)]">
        <div className="flex items-center gap-3">
          <Gauge className="h-4 w-4 text-[var(--color-secondary)]" />
          <div className="flex flex-col">
            <span>Verification score</span>
            <span className="text-lg font-semibold text-[var(--color-secondary)]">{score}%</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4" />
          <time dateTime={timestamp} className="text-sm normal-case text-[var(--color-foreground)]">
            {timestamp}
          </time>
        </div>
      </footer>

      {/* Contract Information */}
      {contractData && (
        <div className="relative z-10 rounded-2xl border border-white/40 bg-white/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-[var(--color-foreground)]">
            <Link2 className="h-4 w-4 text-[var(--color-primary)]" />
            <span className="font-semibold uppercase tracking-[0.18em]">On-Chain Record</span>
          </div>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--color-muted)]">Company:</span>
              <span className="font-mono text-xs">{contractData.company?.slice(0, 8)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-muted)]">Auditor:</span>
              <span className="font-mono text-xs">{contractData.auditor?.slice(0, 8)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-muted)]">Verified:</span>
              <span className={contractData.verified ? "text-[var(--color-success)]" : "text-[var(--color-muted)]"}>
                {contractData.verified ? "Yes" : "No"}
              </span>
            </div>
            {certificateTokenId && (
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Certificate:</span>
                <span className="font-mono text-xs">#{certificateTokenId}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

