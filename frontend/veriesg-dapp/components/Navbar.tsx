"use client";

import Link from "next/link";
import { Logo } from "./brand/Logo";
import { motion } from "framer-motion";
import { MenuIcon, ScanQrCode } from "lucide-react";
import WalletButtonWrapper from "./WalletButtonWrapper";

const links = [
  { label: "Overview", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Verify Claims", href: "/verify" },
];

export default function Navbar() {

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-white/20 bg-white/70 backdrop-blur-lg"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between gap-20 px-16 py-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden text-sm font-medium uppercase tracking-[0.4em] text-[var(--color-muted)] sm:block">
            Transparent ESG Verification
          </span>
        </div>

        <nav className="hidden items-center gap-20 text-sm font-semibold text-[var(--color-muted)] md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative inline-flex items-center gap-2 rounded-full px-6 py-3 transition-all hover:bg-white/60 hover:text-[var(--color-foreground)]"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-12">
          <Link
            href="/verify"
            className="hidden items-center gap-3 rounded-full border border-white/40 bg-white/70 px-10 py-5 text-lg font-semibold text-[var(--color-foreground)] shadow-primary transition-all hover:-translate-y-0.5 hover:shadow-secondary md:inline-flex"
          >
            <ScanQrCode className="h-4 w-4" />
            <span>Submit Claim</span>
          </Link>

          <div className="inline-flex">
            <WalletButtonWrapper />
          </div>

          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/60 text-[var(--color-foreground)] transition-colors hover:bg-white md:hidden">
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}

