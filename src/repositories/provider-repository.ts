import { providerApi, userApi } from '@/apis';
import { MIN_BALANCE } from '@/consts';

class ProviderRepository {
  async submitReq(input: { providerAddress: string; proof: any }) {
    const { totalBalance } = await userApi.getBalance();
    if (totalBalance <= MIN_BALANCE) throw new Error('BALANCE_NOT_ENOUGH');

    await providerApi.submitReq(input);
  }

  async getVerisoulSession(): Promise<{
    sessionId: string;
  }> {
    return providerApi.getVerisoulSession();
  }
}

export const providerRepository = new ProviderRepository();
