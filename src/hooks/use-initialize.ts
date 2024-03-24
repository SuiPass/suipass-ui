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
    if (account) rootStore.contract.set.account(account);
  }, [!account]);
}
