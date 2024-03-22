import { Repository } from '@/base';
import { SUI_CONFIGS } from '@/configs';
import { TransactionBlock } from '@mysten/sui.js/transactions';

class ProviderRepository extends Repository {
  async submitReq(input: { provider: string; proof: any }) {
    const func = 'suipass::submit_request';
    const txb = new TransactionBlock();

    const coin = txb.splitCoins(txb.gas, [100]);
    txb.moveCall({
      arguments: [
        txb.object(SUI_CONFIGS.SUIPASS_ADDR),
        txb.pure.address(SUI_CONFIGS.GITHUB_PROVIDER_ID),
        txb.pure.string(JSON.stringify(input.proof)),
        coin,
      ],
      target: `${SUI_CONFIGS.PACKAGE_ADDR}::${func}`,
    });

    txb.transferObjects(
      [coin],
      txb.pure('0xe2506e387f97da99fa0b9bae65c46cf34a3b465404911136bb9d109ab43557b7'),
    );

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

  async mintPassportTxb(): Promise<TransactionBlock> {
    const txb = new TransactionBlock();
    txb.moveCall({
      arguments: [
        txb.object(SUI_CONFIGS.SUIPASS_ADDR),
        // Id of User Object
        txb.object('0x719b9f551eadbcb92c911e631eba2f0a565d00a2f3bcd14067c70d2f63b11008'),
      ],
      target: `${SUI_CONFIGS.PACKAGE_ADDR}::suipass::mint_passport`,
    });
    return txb;
  }
}

export const providerRepository = new ProviderRepository();
