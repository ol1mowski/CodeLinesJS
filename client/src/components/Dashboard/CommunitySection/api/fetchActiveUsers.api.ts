import { API_URL } from '../../../../config/api.config';
import { useApi } from '../../../../api/hooks/useApi.hook';

export const fetchActiveUsers = async () => {
  try {
    const api = useApi<any>();
    const response = await api.get(`${API_URL}users/active`);

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data) {
      throw new Error('Brak danych z serwera');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
