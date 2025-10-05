"use client";

import { WalletButton } from '@vechain/dapp-kit-react';
import { useEffect, useState } from 'react';

export default function WalletButtonWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="inline-flex items-center gap-3 rounded-full bg-[var(--color-primary)] px-10 py-5 text-lg font-semibold text-white shadow-primary">
        <div className="h-4 w-4 animate-pulse rounded-full bg-white/60" />
        <span>Loading...</span>
      </div>
    );
  }

  return <WalletButton />;
}
