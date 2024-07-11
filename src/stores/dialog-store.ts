import { createStore } from 'zustand-x';

export type DialogStoreState = {
  walletExtInstallDialogOpen: boolean;
  selectWalletDialogOpen: boolean;
};

export const dialogStore = createStore('dialog')(
  <DialogStoreState>{
    walletExtInstallDialogOpen: false,
    selectWalletDialogOpen: false,
  },
  {
    devtools: { enabled: true },
  },
);
