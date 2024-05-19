import { BaseApi } from '@/base';
import { SUI_CONFIGS } from '@/configs';
import { ScorerModel } from '@/models';
import { TransactionBlock } from '@mysten/sui.js/transactions';

class ScorerApi extends BaseApi {
  async create(input: {
    name: string;
    metadata: object;
    providerIds: string[];
    threshold: number;
  }) {
    console.log('CREATE_ENTERPRISE:INPUT', input);
    const func = 'enterprise::create_enterprise';
    const txb = new TransactionBlock();

    txb.moveCall({
      arguments: [
        txb.object(SUI_CONFIGS.SUIPASS_ADDR),
        txb.pure.address(this.account.address),
        txb.pure.string(input.name),
        txb.pure.string(JSON.stringify(input.metadata)),
        txb.pure(input.providerIds),
        txb.pure.u16(input.threshold),
      ],
      target: `${SUI_CONFIGS.PACKAGE_ADDR}::${func}`,
    });

    await this.suiClient.command.mutateAsync({
      transactionBlock: txb,
      options: {
        showEffects: true,
      },
    });
  }

  async getList(): Promise<ScorerModel[]> {
    const res = await this.httpClient({
      method: 'get',
      url: '/scorers',
    });

    return res.data.data;
  }
}

export const scorerApi = new ScorerApi();
