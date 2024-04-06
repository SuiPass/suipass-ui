import { providerApi, userApi } from '@/apis';
import { CredStatus, UserDto, UserStatisticsDto } from '@/dtos';

class UserRepository {
  async newUser(input: { name: string }) {
    await userApi.newUser(input);
  }

  async getUserInfo() {
    return userApi.getUserInfo();
  }

  async getSuiCoin() {
    return userApi.getSuiCoin();
  }

  async getDetail(): Promise<UserDto> {
    return userApi.getDetail();
  }

  async getStatistics(): Promise<UserStatisticsDto> {
    const [userDetailModel, providerModels] = await Promise.all([
      userApi.getDetail(),
      providerApi.getList(),
    ]);

    const allCredsCount = providerModels.length;
    const verifiedCredsCount = providerModels.filter(
      (provider) => provider.status === CredStatus.Verified,
    ).length;
    const humanityPoints = userDetailModel.totalScore;
    const maxPoints = providerModels.reduce((prev, current) => {
      return prev + current.maxScore;
    }, 0);

    return {
      allCredsCount,
      verifiedCredsCount,
      humanityPoints,
      maxPoints,
    };
  }
}

export const userRepository = new UserRepository();
