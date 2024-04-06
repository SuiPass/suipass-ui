import { QUERY_KEYS } from '@/consts';
import { userRepository } from '@/repositories';
import { useQuery } from '@tanstack/react-query';

export const useStatisticsOfUser = () => {
  const { data: userStatsData, isLoading: userStatsIsLoading } = useQuery({
    queryKey: [QUERY_KEYS.STATISTICS_OF_USER],
    queryFn: async () => {
      return userRepository.getStatistics();
    },
  });

  return {
    userStatsData,
    userStatsIsLoading,
  };
};
