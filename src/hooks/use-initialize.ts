import { EventNames, rootEventHandler } from '@/events';
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
    rootEventHandler.emit(EventNames.INIT_SUI_CLIENT, { client, account });
  }, [client, account]);

  useEffect(() => {
    rootEventHandler.emit(EventNames.CHECK_LOGGED, { account });
  }, []);
}
