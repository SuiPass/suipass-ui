import { ApprivalDto } from '.';

export type UserDto = {
  address: string;
  approvals: ApprivalDto[];
  totalScore: number;
};

export type UserStatisticsDto = {
  allCredsCount: number;
  verifiedCredsCount: number;
  humanityPoints: number;
  maxPoints: number;
};
