import { UserStats } from '../types/stats.types';
import { API_URL } from '../../../../config/api.config';
import { useApi } from '../../../../api/hooks/useApi.hook';

export const fetchStats = async (): Promise<UserStats> => {
  const api = useApi<any>();
  const response = await api.get(`${API_URL}users/stats`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  const data = response.data;

  return {
    ...data.data,
    chartData: {
      daily: data.chartData?.daily || [],
      categories: data.chartData?.categories || [],
    },
  };
};
