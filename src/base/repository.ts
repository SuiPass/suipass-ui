import { useContractStore } from '@/stores';

export class Repository {
  protected get client() {
    const { client } = useContractStore.getState();
    if (client) return client;
    throw Error(`${this.constructor.name}: Contract client is nil!`);
  }

  protected get account() {
    const { account } = useContractStore.getState();
    if (account) return account;
    throw Error(`${this.constructor.name}: Contract wallet account is nil!`);
  }

  protected get suiCoin() {
    const { coin } = useContractStore.getState();
    if (coin?.sui) return coin.sui;
    throw Error(`${this.constructor.name}: Sui coin of account is nil!`);
  }
}
