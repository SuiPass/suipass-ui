import { createStore } from 'zustand-x';

export type AppStoreState = {
  isLoading: boolean;
  isLogged: boolean;
  isRegistered: boolean;
  walletExtInstallDialogOpen: boolean;
};

export const appStore = createStore('app')(
  <AppStoreState>{
    isLoading: true,
    isLogged: false,
    isRegistered: false,
    walletExtInstallDialogOpen: false,
  },
  {
    devtools: { enabled: true },
  },
);
