import { useContractStore } from '@/stores';
import { rootEventHandler, EventNames } from '..';
import { WalletAccount } from '@wallet-standard/base';

rootEventHandler.on(
  EventNames.INIT_SUI_CLIENT,
  async (payload: { client: any; account: WalletAccount }) => {
    const { setClient, setAccount } = useContractStore.getState();
    if (payload.client) setClient(payload.client);
    if (payload.account) setAccount(payload.account);
  },
);
