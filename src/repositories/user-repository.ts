import { SUI_CONFIGS } from '@/configs';
import { useContractStore } from '@/stores';
import { TransactionBlock } from '@mysten/sui.js/transactions';

class UserRepository {
  private get client() {
    const { client } = useContractStore.getState();
    if (client) return client;
    throw Error('Contract client is nil!');
  }

  private get account() {
    const { account } = useContractStore.getState();
    if (account) return account;
    throw Error('Contract wallet account is nil!');
  }

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

  async submitReq() {
    const txb = new TransactionBlock();
    const func = 'provider::submit_request';
    txb.moveCall({
      arguments: [],
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
