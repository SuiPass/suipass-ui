import { providerApi } from '@/apis';

class ProviderRepository {
  async submitReq(input: { providerAddress: string; proof: any }) {
    await providerApi.submitReq(input);
  }
}

export const providerRepository = new ProviderRepository();
