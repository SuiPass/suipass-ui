import { useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui.js/client';
import { WalletAccount } from '@wallet-standard/base';
import { createStore } from 'zustand-x';

export type ContractStoreState = {
  client: (SuiClient & { command: ReturnType<typeof useSignAndExecuteTransactionBlock> }) | null;
  account: WalletAccount | null;
  disconnectWallet: (() => any) | null;
  coin: { sui: string } | null;
  user: { id: string } | null;
};

export const contractStore = createStore('contract')(
  <ContractStoreState>{
    client: null,
    account: null,
    disconnectWallet: null,
    coin: null,
    user: null,
  },
  {
    devtools: { enabled: true },
  },
);
