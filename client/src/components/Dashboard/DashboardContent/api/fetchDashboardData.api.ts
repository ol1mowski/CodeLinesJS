import { httpClient } from "../../../../api/httpClient.api";

import { DashboardData } from '../types/dashboard.types';


export const fetchDashboardData = async (): Promise<DashboardData> => {
  
  const response = await httpClient.get(`users/stats`);

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
