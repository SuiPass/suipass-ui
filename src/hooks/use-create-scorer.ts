import { scorerRepository } from '@/repositories';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export function useCreateScorer() {
  const navigate = useNavigate();

  const createScorerMutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      metadata: object;
      providerIds: string[];
      threshold: number;
    }) => {
      await scorerRepository.create(payload);
      navigate({ to: '/enteprise-list' });
    },
  });

  return {
    createScorerMutation,
  };
}
