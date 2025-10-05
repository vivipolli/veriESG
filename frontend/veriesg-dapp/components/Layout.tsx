"use client";

import Navbar from "./Navbar";
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[rgba(155,93,229,0.15)] blur-3xl" />
        <div className="absolute left-6 top-1/3 h-[420px] w-[420px] rounded-full bg-[rgba(0,187,249,0.12)] blur-[140px]" />
        <div className="absolute bottom-0 right-12 h-[360px] w-[360px] rounded-full bg-[rgba(0,245,212,0.15)] blur-[120px]" />
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 pb-16 pt-10 md:pb-20">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/30 bg-white/60 py-8 text-sm text-[var(--color-muted)] backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-[var(--color-foreground)]">VeriESG • Trust the traceable impact</span>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em]">
            <span className="pill">Layer 2 data integrity</span>
            <span className="pill">Layer 3 intelligence</span>
            <span className="pill">Layer 4 attestations</span>
          </div>
        </div>
      </footer>
      
    </div>
  );
}

