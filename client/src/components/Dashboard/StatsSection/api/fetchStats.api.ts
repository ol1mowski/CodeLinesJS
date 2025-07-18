import { UserStats } from '../types/stats.types';
import { API_URL } from '../../../../config/api.config';

export const fetchStats = async (): Promise<UserStats> => {
  const response = await fetch(`${API_URL}users/stats`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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
      categories: data.chartData?.categories || [],
    },
  };
};
