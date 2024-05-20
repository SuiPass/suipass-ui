import { BaseApi } from '@/base';
import { SUI_CONFIGS } from '@/configs';
import { ScorerModel } from '@/models';
import { TransactionBlock } from '@mysten/sui.js/transactions';

class ScorerApi extends BaseApi {
  async create(input: {
    name: string;
    metadata: string;
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
        txb.pure.string(input.metadata),
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
    // Get events
    const events = await this.suiClient.queryEvents({
      query: {
        Sender: this.account.address,
      },
      limit: 99999,
    });
    const parsedEvents = events.data
      .filter((data) => data.type === `${SUI_CONFIGS.PACKAGE_ADDR}::enterprise::CreatedEnterprise`)
      .map((data) => data);

    // Get objects
    const res = await this.suiClient.multiGetObjects({
      options: {
        showContent: true,
      },
      ids: parsedEvents.map((event) => (event.parsedJson as any).enterprise_id),
    });

    const dtos = res.map((object) => {
      const data = (object.data!.content as any).fields;
      const id: string = data.id.id;
      const name: string = data.name;
      const metadata: string = data.metadata;

      const providerIds: string[] = data.providers.fields.contents.map(
        (item: any) => item.fields.key,
      );
      const threshold: number = data.threshold;

      return {
        id,
        name,
        metadata,
        providerIds,
        threshold,
      };
    });

    return dtos;
  }
}

export const scorerApi = new ScorerApi();
