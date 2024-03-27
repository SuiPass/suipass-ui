import { appStore } from './app-store';
import { contractStore } from './contract-store';
import { userRepository } from '@/repositories';
import { generateUsername } from 'unique-username-generator';

// Global store
export const rootStore = {
  app: appStore,
  contract: contractStore,
};

// Listeners
contractStore.store.subscribe(async (state, prevState) => {
  // connected
  if (state.account !== prevState.account && state.account) {
    let user = await userRepository.getUserInfo();

    if (!user) {
      await new Promise((res) => {
        setTimeout(() => res(true), 500);
      });
      await userRepository.newUser({ name: generateUsername() });
      user = await userRepository.getUserInfo();
    }

    const coin = await userRepository.getSuiCoin();

    contractStore.set.user({ id: user.data!.objectId });
    appStore.set.isRegistered(true);
    contractStore.set.coin({ sui: coin.data!.objectId });
    appStore.set.isLogged(true);
    appStore.set.isLoading(false);
  }
});
