import { useApi } from '../../../../api/hooks/useApi.hook';
import { API_URL } from '../../../../config/api.config';

export interface GeneralGameStats {
  lessons: {
    value: string;
    label: string;
  };
  games: {
    value: string;
    label: string;
  };
  users: {  
    value: string;
    label: string;
  };
}

export const fetchGeneralStats = async (): Promise<GeneralGameStats> => {
  try {
    const api = useApi<any>();
    const response = await api.get(`${API_URL}stats/general`);

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data) {
      throw new Error('Brak danych z serwera');
    }

    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania statystyk:', error);
    throw error;
  }
} 