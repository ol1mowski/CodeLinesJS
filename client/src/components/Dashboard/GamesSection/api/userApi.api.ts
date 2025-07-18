import { useApi } from '../../../../api/hooks/useApi.hook';
import { API_URL } from '../../../../config/api.config';
import { User } from '../../../Auth/types/auth.types';

export const updateUserPoints = async (points: number): Promise<User> => {
  try {
    const api = useApi<User>();
    const response = await api.put(`${API_URL}progress/points`, { points });

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data) {
      throw new Error('Brak danych z serwera');
    }

    return response.data;
  } catch (error) {
    console.error('Błąd podczas aktualizacji punktów:', error);
    throw error;
  }
};
