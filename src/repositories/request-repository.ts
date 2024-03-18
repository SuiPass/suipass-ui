import { Repository } from '@/base';
import { SUIPASS_API_URL } from '@/configs';
import axios from 'axios';

class RequestRepository extends Repository {
  async list(payload?: { provider: string }) {
    const res = await axios.get(`${SUIPASS_API_URL}/request/list`, {
      params: {
        address: this.account.address,
        provider: payload?.provider,
      },
    });

    return res.data;
  }
}

export const requestRepository = new RequestRepository();
