import { SuiClient } from '@mysten/sui.js/client';
import { WalletAccount } from '@wallet-standard/base';

export enum EventNames {
  CHECK_LOGGED = 'CHECK_LOGGED',
  INIT_SUI_CLIENT = 'INIT_SUI_CLIENT',
  OPEN_CONNECT_WALLET_MODAL = 'OPEN_CONNECT_WALLET_MODAL',
  WALLET_CONNECTED = 'WALLET_CONNECTED',
  WALLET_DISCONNECTED = 'WALLET_DISCONNECTED',
}

export type EventListeners = {
  [EventNames.CHECK_LOGGED]: (payload: { account: WalletAccount }) => any;
  [EventNames.INIT_SUI_CLIENT]: (payload: { client: SuiClient; account: WalletAccount }) => any;
};
