import { BaseApi } from '@/base';
import { SUI_CONFIGS } from '@/configs';
import { ProviderModel } from '@/models';
import { TransactionBlock } from '@mysten/sui.js/transactions';

class ProviderApi extends BaseApi {
  async submitReq(input: { providerAddress: string; proof: any }) {
    console.log('SUBMIT_REQUEST:INPUT', input);
    const func = 'suipass::submit_request';
    const txb = new TransactionBlock();

    const coin = txb.splitCoins(txb.gas, [10000]);
    txb.moveCall({
      arguments: [
        txb.object(SUI_CONFIGS.SUIPASS_ADDR),
        txb.pure.address(input.providerAddress),
        txb.pure.string(JSON.stringify(input.proof)),
        coin,
      ],
      target: `${SUI_CONFIGS.PACKAGE_ADDR}::${func}`,
    });

    txb.transferObjects([coin], txb.pure(this.suiCoin));

    await this.suiClient.command.mutateAsync({
      transactionBlock: txb,
      options: {
        showEffects: true,
      },
    });
  }

  async getList(): Promise<ProviderModel[]> {
    const res = await this.httpClient({
      method: 'get',
      url: '/providers',
    });

    return res.data.data;
  }

  async getVerisoulSession(): Promise<{
    sessionId: string;
  }> {
    const res = await this.httpClient({
      method: 'get',
      url: '/providers/verisoul/session',
    });

    return res.data.data;
  }
}

export const providerApi = new ProviderApi();
