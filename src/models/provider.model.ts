import { CredStatus } from '@/enums';

export type ProviderModel = {
  id: string;
  name: string;
  desc: string;
  logoUrl: string;
  submitFee: string;
  updateFee: string;
  balance: number;
  maxLevel: number;
  maxScore: number;
  approvals?: {
    id: string;
    provider: string;
    level: number;
    issuedDate: string;
    evidence: string;
    score: number;
  }[];
  status?: CredStatus;
  levels: {
    level: number;
    desc: string;
  }[];
};
