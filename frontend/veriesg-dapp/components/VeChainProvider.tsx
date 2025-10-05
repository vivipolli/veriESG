"use client";

import { ReactNode } from 'react';
import { DAppKitProvider } from '@vechain/dapp-kit-react';

interface VeChainProviderProps {
  children: ReactNode;
}

export default function VeChainProvider({ children }: VeChainProviderProps) {

  return (
    <DAppKitProvider
      node={'https://testnet.vechain.org/'}
      usePersistence={true}
      logLevel="DEBUG"
      themeMode='LIGHT'
      language="en"
      requireCertificate={false}
      allowedWallets={['veworld', 'wallet-connect']}
    >
      {children}
    </DAppKitProvider>
  );
}
