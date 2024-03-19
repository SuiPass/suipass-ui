import { useAppStore, useContractStore } from '@/stores';
import { rootEventHandler, EventNames } from '..';
import { userRepository } from '@/repositories';
import { router } from '@/router';
import { generateUsername } from 'unique-username-generator';

rootEventHandler.on(EventNames.WALLET_CONNECTED, async () => {
  const { setIsLogged } = useAppStore.getState();
  const { setCoin, setUser } = useContractStore.getState();

  // check user is registered
  const userInfo = await userRepository.getUserInfo();
  console.info('userInfo', userInfo);

  if (!userInfo) {
    await userRepository.newUser({ name: generateUsername() });
  }

  const suiCoin = await userRepository.getSuiCoin();

  setIsLogged(true);
  setUser({ id: userInfo.data!.objectId });
  setCoin({ sui: suiCoin.data!.objectId });

  router.navigate({
    to: '/dashboard',
  });
});
