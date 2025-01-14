import { useQuery } from '@tanstack/react-query';
import { DashboardData } from '../../../../types/dashboard.types';
import { useAuth } from '../../../../Hooks/useAuth';

const API_URL = 'http://localhost:5001';

const fetchDashboardData = async (): Promise<DashboardData> => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) throw new Error('Brak autoryzacji');

  const response = await fetch(`${API_URL}/api/dashboard`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Brak autoryzacji - zaloguj się ponownie');
    }
    const error = await response.json();
    throw new Error(error.message || 'Błąd podczas pobierania danych');
  }

  return response.json();
};

export const useDashboardData = () => {
  const { isAuthenticated, token } = useAuth();

  return useQuery<DashboardData, Error>({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
    enabled: isAuthenticated && !!token,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      return failureCount < 2 && !error.message.includes('autoryzacji');
    }
  });
}; 