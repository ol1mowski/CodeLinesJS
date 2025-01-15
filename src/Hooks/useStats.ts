import { useQuery } from '@tanstack/react-query';
import { UserStats } from '../types/stats.types';

export const useStats = () => {
  const { data: stats, isLoading, error } = useQuery<UserStats>({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5001/api/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      return {
        ...data,
        badges: data.badges || [],
        unlockedFeatures: data.unlockedFeatures || []
      };
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30
  });

  return { stats, isLoading, error };
}; 