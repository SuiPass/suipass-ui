import { QUERY_KEYS } from '@/consts';
import { scorerRepository } from '@/repositories';
import { useQuery } from '@tanstack/react-query';

export const useListOfScorers = () => {
  const { data: listOfScorersData, isLoading: listOfScorersIsLoading } = useQuery({
    queryKey: [QUERY_KEYS.LIST_OF_SCORERS],
    queryFn: async () => {
      return scorerRepository.getList();
    },
  });

  return {
    listOfScorersData,
    listOfScorersIsLoading,
  };
};
