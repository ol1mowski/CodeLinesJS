import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query';

import { useAuth } from '../../../../../hooks/useAuth';
import { API_URL } from '../../../../../config/api.config';

const RANKING_QUERY_KEY = 'ranking';

const fetchRanking = async () => {
  const { token } = useAuth();
  const response = await fetch(`${API_URL}ranking`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Błąd podczas pobierania rankingu');
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