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
    const response = await fetch(`${API_URL}stats/general`);

    if (!response.ok) {
      throw new Error('Błąd podczas pobierania statystyk');
    }

    const responseData = await response.json();
    const data = responseData.data || responseData;
    
    return data;
  } catch (error) {
    console.error('Błąd podczas pobierania statystyk:', error);
    throw error;
  }
} 