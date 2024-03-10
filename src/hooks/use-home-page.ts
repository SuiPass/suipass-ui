import { useAppWallet } from '.';

export function useHomePage() {
  const { connect } = useAppWallet();
  const connectWalletButtonOnClick = () => {
    connect();
  };

  return {
    connectWalletButtonOnClick,
  };
}
