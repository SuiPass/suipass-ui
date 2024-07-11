import { rootStore } from '@/stores';
import { useCallback } from 'react';
import { getWallets } from '@mysten/wallet-standard';

export function useWalletExtInstall() {
  const getWalletExtInstalled = useCallback(() => {
    return getWallets().get().length > 0;
  }, []);

  const openInstallWalletExtDialog = useCallback(() => {
    rootStore.dialog.set.walletExtInstallDialogOpen(true);
  }, []);

  return {
    getWalletExtInstalled,
    openInstallWalletExtDialog,
  };
}
