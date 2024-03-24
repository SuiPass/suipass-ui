import { createStore } from 'zustand-x';

export type AppStoreState = {
  isLogged: boolean;
  isRegistered: boolean;
};

export const appStore = createStore('app')(
  <AppStoreState>{
    isLogged: false,
    isRegistered: false,
  },
  {
    devtools: { enabled: true },
  },
);
