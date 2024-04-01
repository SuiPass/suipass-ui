import { BaseApi } from '@/base';
import { SUIPASS_API_URL } from '@/configs';
import axios from 'axios';

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
    await this.httpClient({
      method: 'post',
      url: '/requests',
      data: {
        provider: payload.provider,
        proof: payload.proof,
      },
    });
  }
}

export const requestApi = new RequestApi();
