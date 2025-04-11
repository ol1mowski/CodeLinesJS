import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';

import { useAuth } from '../../../../../hooks/useAuth';
import { API_URL } from '../../../../../config/api.config';

const RANKING_QUERY_KEY = 'ranking';

// Symulowana funkcja dla celów demonstracyjnych
// W rzeczywistym przypadku byłoby tu połączenie z API
const fetchRanking = async () => {
  // Symulacja opóźnienia sieciowego
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: 1, username: 'TopCoder', points: 2450, level: 25, avatar: null },
    { id: 2, username: 'JSMaster', points: 2100, level: 22, avatar: null },
    { id: 3, username: 'WebDevPro', points: 1950, level: 20, avatar: null },
    { id: 4, username: 'CodeNinja', points: 1800, level: 18, avatar: null },
    { id: 5, username: 'ReactWizard', points: 1720, level: 17, avatar: null },
    { id: 6, username: 'FrontendGuru', points: 1650, level: 16, avatar: null },
    { id: 7, username: 'DebugHero', points: 1550, level: 15, avatar: null },
    { id: 8, username: 'AlgorithmKing', points: 1500, level: 14, avatar: null },
    { id: 9, username: 'TSExpert', points: 1450, level: 13, avatar: null },
    { id: 10, username: 'WebArtisan', points: 1400, level: 12, avatar: null },
  ];
};

export const prefetchRanking = async (
  queryClient: QueryClient,
) => {
  await queryClient.prefetchQuery({
    queryKey: [RANKING_QUERY_KEY],
    queryFn: () => fetchRanking(),
  });
};

export const useRanking = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [RANKING_QUERY_KEY],
    queryFn: () => fetchRanking(),
    staleTime: 5 * 60 * 1000, // 5 minut
  });

  const prefetchNextPeriod = async () => {
    await prefetchRanking(queryClient);
  };

  return {
    data,
    isLoading,
    error,
    prefetchNextPeriod
  };
}; 