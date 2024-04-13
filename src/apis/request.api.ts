import { BaseApi } from '@/base';

class RequestApi extends BaseApi {
  async getList(payload?: { provider: string }) {
    const res = await this.httpClient({
      method: 'get',
      url: '/requests',
      params: {
        provider: payload?.provider,
      },
    });

    return res.data?.data;
  }

  async create(payload: { provider: string; proof: string }) {
    const res = await this.httpClient({
      method: 'post',
      url: '/requests',
      data: {
        provider: payload.provider,
        proof: payload.proof,
      },
    });

    return res.data?.data?.data;
  }
}

export const requestApi = new RequestApi();
