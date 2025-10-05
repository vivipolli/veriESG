"use client";

import { motion } from "framer-motion";

export function Logo() {
  return (
    <motion.div
      className="inline-flex items-center gap-3"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-primary">
        <svg
          className="h-5 w-5"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 21.2C15.7333 20.0667 18.4667 11.8 24.8667 8.6L30 6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          <path
            d="M6 11.2C10.8 12.1333 15.8667 11.2667 19.4667 7.66667L22 5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="23.5" r="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="6.5" r="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight text-[var(--color-foreground)]">
        <span className="text-base font-semibold tracking-wide">VeriESG</span>
        <span className="text-[11px] uppercase tracking-[0.4em] text-[var(--color-muted)]">
          VeChain Accountability
        </span>
      </span>
    </motion.div>
  );
}
