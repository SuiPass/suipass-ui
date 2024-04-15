import { rootStore } from '@/stores';
import {
  useCurrentAccount,
  useDisconnectWallet,
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { useEffect } from 'react';

export function useInitialize() {
  const client = useSuiClient();
  const command = useSignAndExecuteTransactionBlock();
  const account = useCurrentAccount();
  const { mutate: disconnectWallet } = useDisconnectWallet();

  useEffect(() => {
    (client as any).command = command;
    rootStore.contract.set.client(client as any);
    rootStore.contract.set.disconnectWallet(disconnectWallet);
  }, []);

  useEffect(() => {
    const walletStorageRaw = localStorage.getItem('sui-dapp-kit:wallet-connection-info');
    if (walletStorageRaw) {
      const walletStorageObj = JSON.parse(walletStorageRaw);
      if (walletStorageObj.state.lastConnectedAccountAddress) {
        if (account) {
          rootStore.contract.set.account(account);
        }
      } else rootStore.app.set.isLoading(false);
    } else rootStore.app.set.isLoading(false);
  }, [!account]);
}
