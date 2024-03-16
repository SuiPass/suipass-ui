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
      limit: 1,
      filter: {
        StructType: `${SUI_CONFIGS.PACKAGE_ADDR}::user::User`,
      },
    });

    return res.data[0];
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
}

export const userRepository = new UserRepository();
