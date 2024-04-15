import toast from 'react-hot-toast';
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
    const disconnectWallet = contractStore.get.disconnectWallet()!;

    const isTestnet = state.account.chains[0] === 'sui:testnet';
    if (!isTestnet) {
      disconnectWallet();
      setTimeout(() => {
        toast.error('SuiPass uses Testnet as its preferred network.');
      });
      throw new Error('SuiPass uses Testnet as its preferred network.');
    }

    appStore.set.isLoading(true);

    try {
      let user = await userRepository.getUserInfo();

      if (!user) {
        await new Promise((res) => {
          setTimeout(() => res(true), 2000);
        });
        await userRepository.newUser({ name: generateUsername() });
        user = await userRepository.getUserInfo();
      }

      const coin = await userRepository.getSuiCoin();

      contractStore.set.user({ id: user.data!.objectId });
      appStore.set.isRegistered(true);
      contractStore.set.coin({ sui: coin.data!.objectId });
      appStore.set.isLogged(true);
    } catch (err: any) {
      if (err.message === 'BALANCE_NOT_ENOUGH')
        setTimeout(() => {
          toast.error('The account balance must be greater than 0.5 SUI.');
        });
      disconnectWallet();
      throw err;
    } finally {
      appStore.set.isLoading(false);
    }
  }
});
