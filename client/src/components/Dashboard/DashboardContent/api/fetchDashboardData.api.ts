import { API_URL } from '../../../../config/api.config';
import { DashboardData } from '../types/dashboard.types';
import { useApi } from '../../../../api/hooks/useApi.hook';

export const fetchDashboardData = async (): Promise<DashboardData> => {
  const api = useApi<any>();
  const response = await api.get(`${API_URL}users/stats`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }
  if (response.status === 401) {
    throw new Error('Brak autoryzacji - zaloguj się ponownie');
  }

  return response.data;
};
