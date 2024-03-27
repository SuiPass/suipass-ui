import { providerApi } from '@/apis';
import { Lazy, LazyField } from '@/base';
import { CredDto } from '@/dtos';

class CredRepository {
  async getList(): Promise<CredDto[]> {
    const providerModels = await providerApi.getList();

    const dtos: CredDto[] = providerModels.map((provider) => {
      return {
        id: provider.id,
        name: provider.name,
        desc: provider.desc,
        logo: provider.logoUrl,
        maxPoints: provider.maxScore,
        points: LazyField,
        status: LazyField,
      };
    });

    return dtos;
  }
}

export const credRepository = new CredRepository();
