import { scorerApi } from '@/apis';

class ScorerRepository {
  async getList() {
    const data = await scorerApi.getList();
    return data;
  }

  async create(payload: {
    name: string;
    metadata: string;
    providerIds: string[];
    threshold: number;
  }) {
    const res = await scorerApi.create(payload);
    return res;
  }
}

export const scorerRepository = new ScorerRepository();
