import { useAppWallet } from '.';

export function useHeader() {
  const { isLogged, label, disconnect } = useAppWallet();

  const logoutBtnOnClick = () => {
    disconnect();
  };

  return {
    isLogged,
    label,
    logoutBtnOnClick,
  };
}
