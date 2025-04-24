import { API_URL } from '../../../../../config/api.config';
import { RankingResponse } from '../types/ranking.types';

interface FetchRankingParams {
  page?: number;
  limit?: number;
}

export const fetchRanking = async (
  token: string, 
  params: FetchRankingParams = { page: 1, limit: 10 }
): Promise<{
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
    // Dodajemy parametry paginacji do URL
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `${API_URL}ranking?${queryParams.toString()}`;
    
    const response = await fetch(url, {
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
    throw error instanceof Error ? error : new Error('Nieznany błąd podczas pobierania rankingu');
  }
}; 