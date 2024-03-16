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
}
