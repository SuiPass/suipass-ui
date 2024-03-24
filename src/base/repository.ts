import { rootStore } from '@/stores';

export class Repository {
  protected get client() {
    const client = rootStore.contract.get.client();
    if (client) return client;
    throw Error(`${this.constructor.name}: Contract client is nil!`);
  }

  protected get account() {
    const account = rootStore.contract.get.account();
    if (account) return account;
    throw Error(`${this.constructor.name}: Contract wallet account is nil!`);
  }

  protected get suiCoin() {
    const coin = rootStore.contract.get.coin();
    if (coin?.sui) return coin.sui;
    throw Error(`${this.constructor.name}: Sui coin of account is nil!`);
  }

  protected get user() {
    const user = rootStore.contract.get.user();
    if (user) return user;
    throw Error(`${this.constructor.name}: User is nil!`);
  }
}
