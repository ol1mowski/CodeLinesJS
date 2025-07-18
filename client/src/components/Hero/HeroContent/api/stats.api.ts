import { httpClient } from "../../../../api/httpClient.api";

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
    const response = await httpClient.get(`stats/general`);

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