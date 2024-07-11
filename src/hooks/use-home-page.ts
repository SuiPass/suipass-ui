import { useState } from 'react';
import { useAppWallet, useWalletExtInstall } from '.';
import { rootStore } from '@/stores';

export function useHomePage() {
  const [loading, setLoading] = useState(false);
  // const { connect } = useAppWallet({ setLoading });
  // const { getWalletExtInstalled, openInstallWalletExtDialog } = useWalletExtInstall();

  const signInBtnOnClick = () => {
    rootStore.dialog.set.selectWalletDialogOpen(true);
    // if (getWalletExtInstalled()) {
    //   setLoading(true);
    //   connect();
    // } else {
    //   openInstallWalletExtDialog()
    // }
  };

  return {
    signInBtnIsLoading: loading,
    signInBtnOnClick,
  };
}
