import { SUIPASS_CONFIGS } from '@/configs';
import { rootStore } from '@/stores';
import axios, { AxiosRequestConfig } from 'axios';

export class BaseApi {
  protected get suiClient() {
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

  protected httpClient(config: AxiosRequestConfig) {
    return axios({
      baseURL: SUIPASS_CONFIGS.API_URL,
      headers: {
        ['x-wallet-address']: this.account.address,
      },
      ...config,
    });
  }
}
