export type ScorerModel = {
  id: string;
  name: string;
  metadata: {
    desc: string;
    usecaseId: string;
    createdAt: number;
  };
  providerIds: string[];
  threshold: number;
};
