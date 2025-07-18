import { API_URL } from '../../../../config/api.config';
import { useApi } from '../../../../api/hooks/useApi.hook';

export const updateUserPoints = async (points: number) => {
  const api = useApi<any>();
  const response = await api.put(`${API_URL}progress/points`, { points });
  if (response.error) {
    throw new Error(response.error);
  }
  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }
  return response.data;
};
