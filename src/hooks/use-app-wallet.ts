import { EventNames, rootEventHandler } from '@/events';
import { useAppStore } from '@/stores';
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
} from '@mysten/dapp-kit';
import { useCallback } from 'react';

export function useAppWallet() {
  const { isLogged } = useAppStore();
  const currentAccount = useCurrentAccount();
  const wallets = useWallets();
  const { mutate: connectWallet } = useConnectWallet();
  const { mutate: disconnectWallet } = useDisconnectWallet();

  const connect = useCallback(() => {
    connectWallet(
      { wallet: wallets[0] },
      {
        onSuccess: () => {
          rootEventHandler.emit(EventNames.WALLET_CONNECTED);
        },
      },
    );
  }, [wallets]);

  const disconnect = useCallback(() => {
    disconnectWallet();
    rootEventHandler.emit(EventNames.WALLET_DISCONNECTED);
  }, []);

  return {
    logged: !!currentAccount && isLogged,
    label: currentAccount?.label,
    connect,
    disconnect,
  };
}
