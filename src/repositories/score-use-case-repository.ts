import { scoreUseCaseApi } from '@/apis';

class ScoreUseCaseRepository {
  async getList() {
    const data = await scoreUseCaseApi.getList();
    return data;
  }
}

export const scoreUseCaseRepository = new ScoreUseCaseRepository();
