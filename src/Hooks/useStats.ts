import { useQuery } from '@tanstack/react-query';
import { UserStats } from '../types/stats.types';
import { API_URL } from '../config/api.config';

const fetchStats = async (): Promise<UserStats> => {
  const response = await fetch(`${API_URL}/user/stats`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  
  return response.json();
};

export const useStats = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['userStats'],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    stats: data,
    isLoading,
    error: error ? (error as Error).message : null,
    refetch
  };
}; 