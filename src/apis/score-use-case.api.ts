import { BaseApi } from '@/base';
import { ScoreUseCaseModel } from '@/models';

class ScoreUseCaseApi extends BaseApi {
  async getList(): Promise<ScoreUseCaseModel[]> {
    const res = await this.httpClient({
      method: 'get',
      url: '/score-use-cases',
    });

    return res.data.data;
  }
}

export const scoreUseCaseApi = new ScoreUseCaseApi();
