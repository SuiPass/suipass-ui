import { useAppStore, useContractStore } from '@/stores';
import { rootEventHandler, EventNames } from '..';
import { WalletAccount } from '@wallet-standard/base';
import { userRepository } from '@/repositories';

rootEventHandler.on(EventNames.CHECK_LOGGED, async (payload: { account: WalletAccount }) => {
  const { setIsLogged } = useAppStore.getState();
  const { setCoin } = useContractStore.getState();
  setIsLogged(!!payload.account);

  const suiCoin = await userRepository.getSuiCoin();
  console.info('suiCoin', suiCoin);
  setCoin({ sui: suiCoin.data?.objectId });
});
