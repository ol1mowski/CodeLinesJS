import { useQuery } from '@tanstack/react-query';
import { UserStats } from '../types/stats.types';
import { useAuth } from './useAuth';

const API_URL = 'http://localhost:5001';

const fetchStats = async (token: string): Promise<UserStats> => {
  const response = await fetch(`${API_URL}/api/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Błąd podczas pobierania statystyk');
  }

  return response.json();
};

export const useStats = () => {
  const { token, isAuthenticated } = useAuth();

  return useQuery<UserStats, Error>({
    queryKey: ['stats'],
    queryFn: () => fetchStats(token as string),
    enabled: isAuthenticated && !!token,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      return failureCount < 2 && !error.message.includes('autoryzacji');
    }
  });
}; 