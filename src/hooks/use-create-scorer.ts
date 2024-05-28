import { scorerRepository } from '@/repositories';
import { useMutation } from '@tanstack/react-query';

export function useCreateScorer() {
  const createScorerMutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      metadata: {
        desc: string;
        usecaseId: string;
        createdAt: number;
      };
      providerIds: string[];
      threshold: number;
    }) => {
      await scorerRepository.create(payload);
    },
  });

  return {
    createScorerMutation,
  };
}
