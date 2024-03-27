import { BaseRepository } from '@/base';
import { SUIPASS_API_URL } from '@/configs';
import axios from 'axios';

class RequestRepository extends BaseRepository {
  async list(payload?: { provider: string }) {
    console.info(this.constructor.name, { list: payload });
    const res = await axios.get(`${SUIPASS_API_URL}/requests`, {
      params: {
        address: this.account.address,
        provider: payload?.provider,
      },
    });

    return res.data?.data;
  }

  async create(payload?: { provider: string }) {
    console.info(this.constructor.name, { create: payload });
    await axios.post(`${SUIPASS_API_URL}/requests`, payload, {
      params: {
        address: this.account.address,
      },
    });
  }
}

export const requestRepository = new RequestRepository();
