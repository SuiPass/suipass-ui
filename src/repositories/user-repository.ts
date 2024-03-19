import { Repository } from '@/base';
import { SUI_CONFIGS } from '@/configs';
import { TransactionBlock } from '@mysten/sui.js/transactions';

class UserRepository extends Repository {
  async getUserInfo() {
    const res = await this.client.getOwnedObjects({
      owner: this.account.address,
      options: {
        showContent: true,
      },
      filter: {
        StructType: `${SUI_CONFIGS.PACKAGE_ADDR}::user::User`,
      },
    });

    return res.data[res.data.length - 1];
  }

  async getSuiCoin() {
    const res = await this.client.getOwnedObjects({
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

  async getScore(input: { name: string }) {
    const txb = new TransactionBlock();
    const func = 'suipass::calculate_user_score';
    txb.moveCall({
      arguments: [txb.object(SUI_CONFIGS.SUIPASS_ADDR), txb.object(this.user.id)],
      target: `${SUI_CONFIGS.PACKAGE_ADDR}::${func}`,
    });

    await this.client.command.mutateAsync(
      {
        transactionBlock: txb,
        options: {
          showEffects: true,
        },
      },
      {
        onSuccess: (tx) => {
          console.log('[SUCCESS]', func, JSON.stringify(tx));
        },
        onError: (e) => {
          console.log('[ERROR]', func, JSON.stringify(e));
        },
      },
    );
  }

  async newUser(input: { name: string }) {
    const txb = new TransactionBlock();
    const func = 'user::new';
    txb.moveCall({
      arguments: [txb.pure.string(JSON.stringify({ name: input.name }))],
      target: `${SUI_CONFIGS.PACKAGE_ADDR}::${func}`,
    });

    await this.client.command.mutateAsync(
      {
        transactionBlock: txb,
        options: {
          showEffects: true,
        },
      },
      {
        onSuccess: (tx) => {
          console.log('[SUCCESS]', func, JSON.stringify(tx));
        },
        onError: (e) => {
          console.log('[ERROR]', func, JSON.stringify(e));
        },
      },
    );
  }

  async getStamps() {
    const res = await this.client.getOwnedObjects({
      owner: SUI_CONFIGS.GITHUB_PROVIDER_ID,
      options: {
        showContent: true,
      },
      // filter: {
      //   StructType: `${SUI_CONFIGS.PACKAGE_ADDR}::user::User`,
      // },
    });

    return res.data;
  }
}

export const userRepository = new UserRepository();
