"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Satellite, Layers3, Sparkles, GlobeLock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Layer 2 Intelligence",
    description: "Orchestrated ingestion from NASA EOSDIS, MapBiomas, and Copernicus with provenance signatures.",
    icon: <Satellite className="h-5 w-5" />,
  },
  {
    title: "Layer 3 Verification",
    description: "Adaptive anomaly detection, ESG scoring, and consensus-ready insights for auditors.",
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    title: "Layer 4 Attestation",
    description: "Immutable VeChain NFTs minted for trusted ESG claims and real-time proof sharing.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const benefits = [
  {
    title: "Climate-grade transparency",
    description: "Transparent lineage linking data to attestations for verifiers and investors alike.",
  },
  {
    title: "Delegated experience",
    description: "Fee delegation keeps onboarding frictionless, while maintaining enterprise-grade security.",
  },
];

export default function HomePage() {
  return (
    <section className="relative flex flex-col gap-20 pb-20">
      <motion.header
        className="relative flex flex-col gap-8 overflow-hidden rounded-[36px] border border-white/30 bg-white/70 px-8 pb-16 pt-14 text-center shadow-primary backdrop-blur-xl md:px-16"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 rounded-full bg-[rgba(155,93,229,0.2)] blur-3xl" />
        <span className="z-10 mx-auto pill bg-white/80 text-[var(--color-secondary)]">
          VeChain powered ESG verification
        </span>
        <h1 className="z-10 mx-auto max-w-3xl text-4xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
          Trusted ESG attestations with <span className="heading-gradient">multi-layer verification</span>
        </h1>
        <p className="z-10 mx-auto max-w-2xl text-base text-[var(--color-muted)]">
          Connect off-chain intelligence to on-chain proofs. VeriESG validates claims against authoritative satellite and ground-truth sources,
          generates confidence scores, and records every attestation transparently on VeChain.
        </p>
        <div className="z-10 flex flex-wrap justify-center gap-4">
          <Link href="/verify" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            Submit a claim
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] shadow-secondary transition-all hover:-translate-y-0.5"
          >
            Explore dashboard
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.header>

      <motion.section
        className="card-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1, ease: "easeOut" },
          },
        }}
      >
        {features.map((feature) => (
          <motion.article
            key={feature.title}
            className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-6 shadow-card backdrop-blur-xl"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[rgba(155,93,229,0.1)]" />
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(155,93,229,0.12)] text-[var(--color-primary)]">
              {feature.icon}
            </div>
            <h3 className="relative z-10 mt-5 text-xl font-semibold text-[var(--color-foreground)]">{feature.title}</h3>
            <p className="relative z-10 mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{feature.description}</p>
          </motion.article>
        ))}
      </motion.section>

      <motion.section
        className="grid gap-10 rounded-[32px] border border-white/40 bg-white/65 p-10 shadow-card backdrop-blur-xl md:grid-cols-[1.2fr_0.8fr]"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">
            <GlobeLock className="h-4 w-4 text-[var(--color-secondary)]" />
            Why VeChain?
          </span>
          <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
            Low-carbon consensus meets verifiable sustainability records
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">
            VeriESG leverages VeChainThor for secure, energy-efficient attestations aligned with enterprise ESG standards. Every verification step preserves
            provenance and embeds trust for auditors, partners, and watchdogs.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/40 bg-white/70 p-4">
                <h3 className="text-sm font-semibold text-[var(--color-foreground)]">{item.title}</h3>
                <p className="mt-2 text-xs text-[var(--color-muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-white/30 bg-[var(--surface-200)] p-6 shadow-card">
            <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">Trusted by</h3>
            <p className="mt-3 text-lg font-semibold text-[var(--color-foreground)]">Auditors • ESG analysts • Climate funds</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Live verifiability and delegated transactions make compliance reporting accurate, effortless, and fast.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-between rounded-3xl border border-dashed border-[var(--color-secondary)] bg-white/70 px-5 py-4 text-sm font-semibold text-[var(--color-secondary)]"
          >
            View live attestations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.section>
    </section>
  );
}

