import { useAppStore } from '@/stores';
import { rootEventHandler, EventNames } from '..';
import { router } from '@/router';

rootEventHandler.on(EventNames.WALLET_DISCONNECTED, async () => {
  const { setIsLogged } = useAppStore.getState();
  setIsLogged(false);
  router.navigate({
    to: '/',
  });
});
