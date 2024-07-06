import { providerApi } from '@/apis';
import { CredDto, ProviderDto } from '@/dtos';
import { CredStatus } from '@/enums';

class CredRepository {
  async getList({ status }: { status?: CredStatus[] } = {}): Promise<CredDto[]> {
    const providerModels = await providerApi.getList();

    let dtos: CredDto[] = providerModels.map((provider) => {
      const currentApproval = provider.approvals ? provider.approvals[0] : null;
      let currentLevel = 0;
      if (currentApproval) {
        currentLevel = currentApproval.level;
      }

      return {
        id: provider.id,
        name: provider.name,
        desc: provider.desc,
        logo: provider.logoUrl,
        maxPoints: provider.maxScore,
        status: provider.status ?? CredStatus.NotVerified,
        points: currentApproval?.score ?? 0,
        issuedDate: currentApproval ? new Date(+currentApproval.issuedDate) : null,
        levels: provider.levels,
        currentLevel,
      };
    });

    if (status) dtos = dtos.filter((dto) => status.includes(dto.status));

    return dtos;
  }

  async getStats(): Promise<{
    allCredsCount: number;
    verifiedCredsCount: number;
    verifiedCreds: ProviderDto[];
  }> {
    const providerModels = await providerApi.getList();

    const allCredsCount = providerModels.length;
    const verifiedCreds = providerModels.filter(
      (provider) => provider.status === CredStatus.Verified,
    );
    const verifiedCredsCount = verifiedCreds.length;

    return {
      allCredsCount,
      verifiedCredsCount,
      verifiedCreds,
    };
  }
}

export const credRepository = new CredRepository();
