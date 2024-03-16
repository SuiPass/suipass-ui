import { useAppWallet } from '.';

export function useHomePage() {
  const { connect, connectWalletIsPending } = useAppWallet();
  const connectWalletButtonOnClick = () => {
    connect();
  };

  return {
    connectWalletIsPending,
    connectWalletButtonOnClick,
  };
}
