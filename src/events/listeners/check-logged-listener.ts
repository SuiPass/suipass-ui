import { useAppStore } from '@/stores';
import { rootEventHandler, EventNames } from '..';
import { WalletAccount } from '@wallet-standard/base';

rootEventHandler.on(EventNames.CHECK_LOGGED, async (payload: { account: WalletAccount }) => {
  const { setIsLogged } = useAppStore.getState();
  setIsLogged(!!payload.account);
});
