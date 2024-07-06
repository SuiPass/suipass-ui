import { CredStatus } from '@/enums';

export type CredDto = {
  id: string;
  name: string;
  desc: string;
  logo: string;
  maxPoints: number;
  status: CredStatus;
  points: number;
  issuedDate: Date | null;
  levels: { level: number; desc: string }[];
  currentLevel: number;
};
