import { httpClient } from "../../../../api/httpClient.api";
import { UserStats } from '../types/stats.types';

export const fetchStats = async (): Promise<UserStats> => {
  
  const response = await httpClient.get(`users/stats`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  const data = response.data;

  return {
    ...data,
    chartData: {
      daily: data.chartData?.daily || [],
      categories: data.chartData?.categories || [],
    },
  };
};
