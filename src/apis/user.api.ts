import { BaseApi } from '@/base';
import { SUI_CONFIGS } from '@/configs';
import { UserModel } from '@/models';
import { TransactionBlock } from '@mysten/sui.js/transactions';

class UserApi extends BaseApi {
  async getUserInfo() {
    const res = await this.suiClient.getOwnedObjects({
      owner: this.account.address,
      options: {
        showContent: true,
      },
      filter: {
        StructType: `${SUI_CONFIGS.ORIGINAL_PACKAGE_ADDR}::user::User`,
      },
    });

    return res.data[res.data.length - 1];
  }

  async getSuiCoin() {
    const res = await this.suiClient.getOwnedObjects({
      owner: this.account.address,
      options: {
        showContent: true,
      },
      filter: {
        StructType: `0x2::coin::Coin<0x2::sui::SUI>`,
      },
    });

    return res.data[res.data.length - 1];
  }

  async getBalance() {
    const res = await this.suiClient.getBalance({
      owner: this.account.address,
    });

    return {
      totalBalance: +res.totalBalance,
    };
  }

  async newUser(input: { name: string }) {
    const txb = new TransactionBlock();
    const func = 'user::new';
    txb.moveCall({
      arguments: [txb.pure.string(JSON.stringify({ name: input.name }))],
      target: `${SUI_CONFIGS.PACKAGE_ADDR}::${func}`,
    });

    await this.suiClient.command.mutateAsync({
      transactionBlock: txb,
      options: {
        showEffects: true,
      },
    });
  }

  async getDetail(): Promise<UserModel> {
    const res = await this.httpClient({
      method: 'get',
      url: '/users/detail',
    });

    return res.data.data;
  }
}

export const userApi = new UserApi();
