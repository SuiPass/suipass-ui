import { useAppWallet } from '.';

export function useHomePage() {
  const { connect, connectWalletIsPending } = useAppWallet();
  const signInBtnOnClick = () => {
    connect();
  };

  return {
    signInBtnIsLoading: connectWalletIsPending,
    signInBtnOnClick,
  };
}
