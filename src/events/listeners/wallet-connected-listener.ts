import { useAppStore } from '@/stores';
import { rootEventHandler, EventNames } from '..';
import { userRepository } from '@/repositories';
import { router } from '@/router';
import { generateUsername } from 'unique-username-generator';

rootEventHandler.on(EventNames.WALLET_CONNECTED, async () => {
  const { setIsLogged } = useAppStore.getState();

  // check user is registered
  const userInfo = await userRepository.getUserInfo();
  console.info(userInfo);

  if (!userInfo) {
    await userRepository.newUser({ name: generateUsername() });
  }

  setIsLogged(true);
  router.navigate({
    to: '/dashboard',
  });
});
