import { API_URL } from '../../../../config/api.config';
import { useApi } from '../../../../api/hooks/useApi.hook';

export const fetchGames = async () => {
  const api = useApi<any>();
  const response = await api.get(`${API_URL}games`);
  if (response.error) {
    throw new Error(response.error);
  }
  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }
  return response.data;
};
