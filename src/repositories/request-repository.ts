import { requestApi } from '@/apis';
class RequestRepository {
  async getList(payload?: { provider: string }) {
    console.info(this.constructor.name, { list: payload });
    const data = await requestApi.getList(payload);
    return data;
  }

  async create(payload: { provider: string; proof: string }) {
    requestApi.create(payload);
  }
}

export const requestRepository = new RequestRepository();
