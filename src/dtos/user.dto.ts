import { ApprivalDto } from '.';

export type UserDto = {
  address: string;
  approvals: ApprivalDto[];
  totalScore: number;
};
