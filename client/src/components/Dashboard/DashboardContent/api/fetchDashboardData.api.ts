import { API_URL } from '../../../../config/api.config';
import { DashboardData } from '../types/dashboard.types';

export const fetchDashboardData = async (token: string): Promise<DashboardData> => {
  if (!token) throw new Error('Brak autoryzacji');

  const response = await fetch(`${API_URL}users/stats`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
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
