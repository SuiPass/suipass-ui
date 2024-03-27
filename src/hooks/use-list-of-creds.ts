import { QUERY_KEYS } from '@/consts';
import { credRepository } from '@/repositories';
import { useQuery } from '@tanstack/react-query';

export const useListOfCreds = () => {
  const { data: listOfCredsData, isLoading: listOfCredsIsLoading } = useQuery({
    queryKey: [QUERY_KEYS.LIST_OF_CREDS],
    queryFn: async () => {
      return credRepository.getList();
    },
  });

  return {
    listOfCredsData,
    listOfCredsIsLoading,
  };
};
