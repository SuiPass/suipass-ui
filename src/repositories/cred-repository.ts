import { providerApi } from '@/apis';
import { LazyField } from '@/base';
import { CredDto, CredStatus } from '@/dtos';

class CredRepository {
  async getList({ status }: { status?: CredStatus[] } = {}): Promise<CredDto[]> {
    const providerModels = await providerApi.getList();

    let dtos: CredDto[] = providerModels.map((provider) => {
      provider.approvals?.sort((a, b) => (a.issuedDate < b.issuedDate ? 1 : -1));

      return {
        id: provider.id,
        name: provider.name,
        desc: provider.desc,
        logo: provider.logoUrl,
        maxPoints: provider.maxScore,
        status: provider.status ?? CredStatus.NotVerified,
        points: provider.approvals ? provider.approvals[0].score : 0,
        issuedDate: provider.approvals ? new Date(+provider.approvals[0].issuedDate) : null,
      };
    });

    if (status) dtos = dtos.filter((dto) => status.includes(dto.status));

    return dtos;
  }
}

export const credRepository = new CredRepository();
