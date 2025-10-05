"use client";

import { useWallet as useVeChainWallet, useWalletModal } from '@vechain/dapp-kit-react';

export default function useWallet() {
  const {
    account,
    accountDomain,
    isAccountDomainLoading,
    source,
    connectionCertificate,
    setSource,
    connect,
    availableWallets,
    disconnect,
  } = useVeChainWallet();

  const { open: openModal, close: closeModal, onConnectionStatusChange } = useWalletModal();

  return {
    account,
    accountDomain,
    isAccountDomainLoading,
    source,
    connectionCertificate,
    setSource,
    connect,
    availableWallets,
    disconnect,
    openModal,
    closeModal,
    onConnectionStatusChange,
  };
}

