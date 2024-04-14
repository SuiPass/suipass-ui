import { useState } from 'react';
import { useAppWallet, useWalletExtInstall } from '.';

export function useHomePage() {
  const [loading, setLoading] = useState(false);
  const { connect } = useAppWallet({ setLoading });
  const { getWalletExtInstalled, openInstallWalletExtDialog } = useWalletExtInstall();

  const signInBtnOnClick = () => {
    if (getWalletExtInstalled()) {
      setLoading(true);
      connect();
    } else {
      openInstallWalletExtDialog()
    }
  };

  return {
    signInBtnIsLoading: loading,
    signInBtnOnClick,
  };
}
