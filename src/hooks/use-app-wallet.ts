import { rootStore } from '@/stores';
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
} from '@mysten/dapp-kit';
import { useCallback } from 'react';
import toaster from 'react-hot-toast';

export function useAppWallet({ setLoading }: { setLoading?: (loading: boolean) => void } = {}) {
  const isLogged = rootStore.app.use.isLogged();
  const currentAccount = useCurrentAccount();
  const wallets = useWallets();
  const { mutate: connectWallet, isPending: connectWalletIsPending } = useConnectWallet();
  const { mutate: disconnectWallet, isPending: disconnectWalletIsPending } = useDisconnectWallet();

  const connect = useCallback(() => {
    connectWallet({ wallet: wallets[0] }, {
      onError: (err) => {
        toaster.error('Please connect or unlock your wallet before logging in!');
        setLoading!(false);
      },
      onSuccess: (data) => {
        const isTestnet = data.accounts[0].chains[0] === "sui:testnet";
        if (!isTestnet) {
          toaster.error('SuiPass uses Testnet as its preferred network.');
          setLoading!(false);
          disconnectWallet();
        }
      }
    })
  }, [wallets]);

  const disconnect = useCallback(() => {
    disconnectWallet();
    window.location.replace('/');
  }, []);

  return {
    isLogged,
    label: currentAccount?.label ?? currentAccount?.address,
    connectWalletIsPending,
    disconnectWalletIsPending,
    connect,
    disconnect,
  };
}
