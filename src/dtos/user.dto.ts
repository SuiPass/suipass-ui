import { ApprivalDto, ProviderDto } from '.';

export type UserDto = {
  address: string;
  approvals: ApprivalDto[];
  totalScore: number;
};

export type UserStatisticsDto = {
  allCredsCount: number;
  verifiedCreds: ProviderDto[];
  verifiedCredsCount: number;
  humanityPoints: number;
  maxPoints: number;
  approvals: ApprivalDto[];
};
