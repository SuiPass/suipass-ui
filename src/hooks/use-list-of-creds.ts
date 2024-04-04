import { QUERY_KEYS } from '@/consts';
import { CredStatus } from '@/dtos';
import { credRepository } from '@/repositories';
import { useQuery } from '@tanstack/react-query';

export const useListOfCreds = ({ status }: { status: CredStatus[] }) => {
  const { data: listOfCredsData, isLoading: listOfCredsIsLoading } = useQuery({
    queryKey: [QUERY_KEYS.LIST_OF_CREDS],
    queryFn: async () => {
      return credRepository.getList({ status });
    },
  });

  return {
    listOfCredsData,
    listOfCredsIsLoading,
  };
};
