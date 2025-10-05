"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const badgeStyles: Record<StatusBadgeProps["status"], string> = {
  pending: "bg-[rgba(155,93,229,0.12)] text-[var(--color-primary)]",
  validated: "bg-[rgba(0,245,212,0.18)] text-[var(--color-success)]",
  rejected: "bg-[rgba(255,77,109,0.12)] text-[var(--color-danger)]",
  verified: "bg-[rgba(0,245,212,0.18)] text-[var(--color-success)]",
  flagged: "bg-[rgba(255,144,31,0.12)] text-[var(--color-danger)]",
};

type StatusBadgeProps = {
  status: "pending" | "validated" | "rejected" | "verified" | "flagged";
  icon?: ReactNode;
  children?: ReactNode;
};

export default function StatusBadge({ status, icon, children }: StatusBadgeProps) {
  return (
    <motion.span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${badgeStyles[status]}`}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span>{children ?? status}</span>
    </motion.span>
  );
}
