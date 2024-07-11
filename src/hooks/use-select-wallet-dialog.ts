import { useMemo } from 'react';
import { getWallets } from '@mysten/wallet-standard';
import { SUPPORTED_WALLETS } from '@/consts';
import { useAppWallet } from './use-app-wallet';
import { rootStore } from '@/stores';

export function useSelectWalletDialog() {
  const { connect } = useAppWallet();

  const availableWallets = useMemo(() => {
    return getWallets().get();
  }, []);

  const listWallets = useMemo(() => {
    let wallets = SUPPORTED_WALLETS;
    availableWallets.forEach((availableWallet) => {
      const matchedWallet = wallets.find((wallet) => wallet.name === availableWallet.name);
      if (matchedWallet) {
        matchedWallet.available = true;
        matchedWallet.connect = () => {
          connect(availableWallet.name);
          rootStore.dialog.set.selectWalletDialogOpen(false);
        };
      }
    });

    wallets = wallets.sort((a, b) => (a.available > b.available ? -1 : 1));

    return wallets;
  }, [availableWallets]);

  return {
    listWallets,
  };
}
