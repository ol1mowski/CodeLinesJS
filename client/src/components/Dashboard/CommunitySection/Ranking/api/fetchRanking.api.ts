import { API_URL } from '../../../../../config/api.config';
import { RankingResponse } from '../types/ranking.types';

export const fetchRanking = async (token: string): Promise<{
  status: string;
  code: number;
  message: string;
  data: RankingResponse;
  meta: any;
}> => {
  if (!token) {
    throw new Error('Brak autoryzacji - zaloguj się, aby zobaczyć ranking');
  }

  try {
    const response = await fetch(`${API_URL}ranking`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      throw new Error('Brak autoryzacji - zaloguj się ponownie');
    }

    if (response.status === 429) {
      throw new Error('Zbyt wiele zapytań. Spróbuj ponownie za chwilę');
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Błąd podczas pobierania rankingu';

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {}

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Błąd pobierania rankingu:', error);
    throw error instanceof Error ? error : new Error('Nieznany błąd podczas pobierania rankingu');
  }
}; 