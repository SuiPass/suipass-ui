import { useState } from 'react';
import { useAppWallet } from '.';

export function useHomePage() {
  const { connect, connectWalletIsPending } = useAppWallet();
  const [loading, setLoading] = useState(false);
  const signInBtnOnClick = () => {
    setLoading(true);
    connect();
  };

  return {
    signInBtnIsLoading: loading,
    signInBtnOnClick,
  };
}
