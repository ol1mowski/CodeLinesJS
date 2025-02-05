import { useQuery } from '@tanstack/react-query';
import { UserStats } from '../types/stats.types';
import { useAuth } from './useAuth';

export const useStats = () => {
  const { token, isAuthenticated } = useAuth();

  const { data: stats, isLoading, error } = useQuery<UserStats>({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5001/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Brak autoryzacji');
        }
        throw new Error('Błąd podczas pobierania statystyk');
      }

      const data = await response.json();
      
      return {
        ...data,
        chartData: {
          daily: data.chartData?.daily || [],
          categories: data.chartData?.categories || []
        }
      };
    },
    enabled: isAuthenticated && !!token,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: (failureCount, error) => {
      if (error.message === 'Brak autoryzacji') return false;
      return failureCount < 3;
    }
  });

  return { stats, isLoading, error };
}; 