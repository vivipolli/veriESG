"use client";

import ESGCard from "@/components/ESGCard";
import StatusBadge from "@/components/StatusBadge";
import { motion } from "framer-motion";
import { LineChart, PieChart, TrendingUp, Blocks, Activity, Sparkle } from "lucide-react";

const mockData = [
  {
    organization: "Hidria Renewables",
    metric: "Carbon Sequestration",
    claim: "12,300 tons captured in 2024",
    status: "verified" as const,
    score: 92,
    timestamp: "2025-09-30T12:00:00Z",
  },
  {
    organization: "Serra Azul Agro",
    metric: "Deforestation Offset",
    claim: "Zero illegal deforestation",
    status: "pending" as const,
    score: 68,
    timestamp: "2025-09-28T09:15:00Z",
  },
  {
    organization: "OceanGuard Analytics",
    metric: "Water Quality Index",
    claim: "Improved by 23% YoY",
    status: "flagged" as const,
    score: 41,
    timestamp: "2025-09-20T16:43:00Z",
  },
];

const stats = [
  {
    label: "Live attestations",
    value: "342",
    change: "+18% vs last quarter",
    icon: <Blocks className="h-5 w-5" />,
  },
  {
    label: "Average confidence",
    value: "87%",
    change: "Layer 3 verified",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    label: "Impact coverage",
    value: "28 regions",
    change: "Across LATAM & EU",
    icon: <PieChart className="h-5 w-5" />,
  },
];

export default function DashboardPage() {
  return (
    <section className="flex flex-col gap-10">
      <motion.header
        className="glass-panel flex flex-col gap-4 p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">
          <Activity className="h-4 w-4 text-[var(--color-secondary)]" />
          Live ESG telemetry
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-[var(--color-foreground)]">ESG Verification Dashboard</h1>
            <p className="max-w-2xl text-sm text-[var(--color-muted)]">
              Monitor verification pipeline health, track on-chain attestations, and ensure that every climate claim is backed by auditable evidence.
            </p>
          </div>
          <StatusBadge status="validated" icon={<Sparkle className="h-4 w-4" />}>TÜV certified workflow</StatusBadge>
        </div>
      </motion.header>

      <motion.section
        className="grid gap-5 md:grid-cols-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      >
        {stats.map((stat) => (
          <article key={stat.label} className="glass-panel flex flex-col gap-3 p-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(0,187,249,0.14)] text-[var(--color-secondary)]">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-muted)]">{stat.label}</p>
              <p className="text-2xl font-semibold text-[var(--color-foreground)]">{stat.value}</p>
            </div>
            <span className="text-xs text-[var(--color-muted)]">{stat.change}</span>
          </article>
        ))}
      </motion.section>

      <motion.div
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
      >
        {mockData.map((item) => (
          <ESGCard key={`${item.organization}-${item.metric}`} {...item} />
        ))}
      </motion.div>

      <motion.div
        className="glass-panel flex flex-col gap-5 p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">Upcoming release</span>
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Validator analytics & impact graphs</h2>
            <p className="max-w-xl text-sm text-[var(--color-muted)]">
              Soon, review validator performance heatmaps, claim lifecycle timelines, and automated ESG impact graphs with real-time drilldowns.
            </p>
          </div>
          <button className="btn-secondary inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[var(--color-secondary)]">
            Join beta waitlist
            <LineChart className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}

