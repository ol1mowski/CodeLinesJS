import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';

const RANKING_QUERY_KEY = 'ranking';

const fetchRanking = async () => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  const response = await fetch(`http://localhost:5001/api/ranking`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch ranking');
  }
  return response.json();
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
    staleTime: 5 * 60 * 1000, 
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