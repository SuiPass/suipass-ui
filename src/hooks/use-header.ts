import { useAppWallet } from '.';

export function useHeader() {
  const { logged, label, disconnect } = useAppWallet();

  const logoutButtonOnClick = () => {
    disconnect();
  };

  return {
    logged,
    label,
    logoutButtonOnClick,
  };
}
