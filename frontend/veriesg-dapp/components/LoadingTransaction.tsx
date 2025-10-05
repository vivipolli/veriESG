"use client";

import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

type LoadingTransactionProps = {
  message?: string;
};

export default function LoadingTransaction({ message = "Broadcasting transaction" }: LoadingTransactionProps) {
  return (
    <motion.div
      className="glass-panel flex items-center gap-3 px-5 py-3 text-sm text-[var(--color-secondary)]"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(0,187,249,0.18)]">
        <Loader2 className="h-4 w-4 animate-spin" />
        <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-[var(--color-primary)]" />
      </div>
      <span>{message}</span>
    </motion.div>
  );
}
