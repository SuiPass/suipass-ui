import { useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui.js/client';
import { create } from 'zustand';
import { WalletAccount } from '@wallet-standard/base';

type ContractStoreState = {
  client: (SuiClient & { command: ReturnType<typeof useSignAndExecuteTransactionBlock> }) | null;
  account: WalletAccount | null;
};
type ContractStoreAction = {
  setClient: (client: ContractStoreState['client']) => void;
  setAccount: (account: ContractStoreState['account']) => void;
};

export const useContractStore = create<ContractStoreState & ContractStoreAction>((set) => ({
  client: null,
  account: null,
  setClient: (client: ContractStoreState['client']) => set({ client }),
  setAccount: (account: ContractStoreState['account']) => set({ account }),
}));
