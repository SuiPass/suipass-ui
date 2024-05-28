import { QUERY_KEYS } from '@/consts';
import { scorerRepository } from '@/repositories';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useListOfScorers = () => {
  const {
    data: listOfScorersData,
    isLoading: listOfScorersIsLoading,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.LIST_OF_SCORERS],
    queryFn: async () => {
      return scorerRepository.getList();
    },
  });

  const queryClient = useQueryClient();

  return {
    listOfScorersData,
    listOfScorersIsLoading,
    refectlistOfScorers: () => {
      refetch();
    },
  };
};
