import { Repository } from '@/base';
import { SUI_CONFIGS } from '@/configs';
import { TransactionBlock } from '@mysten/sui.js/transactions';

class ProviderRepository extends Repository {
  async submitReq(input: { provider: string; proof: any }) {
    const txb = new TransactionBlock();
    const func = 'provider::submit_request';
    txb.moveCall({
      arguments: [txb.pure.string(JSON.stringify(input))],
      target: `${SUI_CONFIGS.PACKAGE_ADDR}::${func}`,
    });

    console.log({
      arguments: [txb.pure.string(JSON.stringify(input))],
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

export const providerRepository = new ProviderRepository();
