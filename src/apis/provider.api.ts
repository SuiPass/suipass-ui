import { BaseApi } from '@/base';
import { SUI_CONFIGS } from '@/configs';
import { ProviderModel } from '@/models';
import { TransactionBlock } from '@mysten/sui.js/transactions';

class ProviderApi extends BaseApi {
  async submitReq(input: { provider: string; proof: any }) {
    const txb = new TransactionBlock();
    const func = 'suipass::submit_request';

    txb.moveCall({
      arguments: [
        txb.object(SUI_CONFIGS.SUIPASS_ADDR),
        txb.pure.address(SUI_CONFIGS.GITHUB_PROVIDER_ID),
        txb.pure.string(JSON.stringify(input.proof)),
        txb.object(this.suiCoin),
      ],
      target: `${SUI_CONFIGS.PACKAGE_ADDR}::${func}`,
    });

    await this.suiClient.command.mutateAsync(
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

  async getList(): Promise<ProviderModel[]> {
    const res = await this.httpClient({
      method: 'get',
      url: '/providers',
    });

    return res.data.data;
  }
}

export const providerApi = new ProviderApi();
