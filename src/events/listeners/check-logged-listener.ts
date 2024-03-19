import { useAppStore, useContractStore } from '@/stores';
import { rootEventHandler, EventNames } from '..';
import { WalletAccount } from '@wallet-standard/base';
import { userRepository } from '@/repositories';

rootEventHandler.on(EventNames.CHECK_LOGGED, async (payload: { account: WalletAccount }) => {
  const { setIsLogged } = useAppStore.getState();
  const { setUser, setCoin } = useContractStore.getState();

  setIsLogged(!!payload.account);

  const [userInfo, suiCoin] = await Promise.all([
    userRepository.getUserInfo(),
    userRepository.getSuiCoin(),
  ]);

  setUser({ id: userInfo.data!.objectId });
  setCoin({ sui: suiCoin.data!.objectId });
});
