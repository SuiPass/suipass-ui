export type UserModel = {
  address: string;
  approvals: {
    id: string;
    provider: string;
    level: number;
    issuedDate: string;
    evidence: string;
    score: number;
  }[];
  totalScore: number;
};
