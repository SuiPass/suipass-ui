import { rootStore } from '@/stores';
import {
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { useEffect } from 'react';

export function useInitialize() {
  const client = useSuiClient();
  const command = useSignAndExecuteTransactionBlock();
  const account = useCurrentAccount();

  useEffect(() => {
    (client as any).command = command;
    rootStore.contract.set.client(client as any);
  }, []);

  useEffect(() => {
    const walletStorageRaw = localStorage.getItem('sui-dapp-kit:wallet-connection-info');
    if (walletStorageRaw) {
      const walletStorageObj = JSON.parse(walletStorageRaw);
      if (walletStorageObj.state.lastConnectedWalletName) {
        if (account) rootStore.contract.set.account(account);
      } else rootStore.app.set.isLoading(false);
    } else rootStore.app.set.isLoading(false);
  }, [!account]);
}
