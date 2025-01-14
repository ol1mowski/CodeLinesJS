import { useQuery } from '@tanstack/react-query';
import { DashboardData } from '../../../../types/dashboard.types';
import { useAuth } from '../../../../Hooks/useAuth';

const API_URL = 'http://localhost:5001';

const fetchDashboardData = async (): Promise<DashboardData> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Brak autoryzacji');

  const response = await fetch(`${API_URL}/api/dashboard`, {
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Błąd podczas pobierania danych');
  }

  return response.json();
};

export const useDashboardData = () => {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, error } = useQuery<DashboardData, Error>({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: 1
  });

  return {
    stats: data?.stats,
    profile: data?.profile,
    notifications: data?.notifications || [],
    unreadCount: data?.unreadCount || 0,
    isLoading,
    error
  };
}; 