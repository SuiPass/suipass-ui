import { QUERY_KEYS } from '@/consts';
import { scoreUseCaseRepository } from '@/repositories';
import { useQuery } from '@tanstack/react-query';

export const useListOfScoreUseCase = () => {
  const { data: listOfScoreUseCaseData, isLoading: listOfScoreUseCaseIsLoading } = useQuery({
    queryKey: [QUERY_KEYS.LIST_OF_SCORE_USE_CASE],
    queryFn: async () => {
      return scoreUseCaseRepository.getList();
    },
  });

  return {
    listOfScoreUseCaseData,
    listOfScoreUseCaseIsLoading,
  };
};
