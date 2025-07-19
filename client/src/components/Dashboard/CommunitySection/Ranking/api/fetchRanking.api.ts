import { httpClient } from "../../../../../api/httpClient.api";

import { RankingResponse } from '../types/ranking.types';


interface FetchRankingParams {
  page?: number;
  limit?: number;
}

export const fetchRanking = async (
  params: FetchRankingParams = { page: 1, limit: 10 }
): Promise<{
  status: string;
  code: number;
  message: string;
  data: RankingResponse;
  meta: any;
}> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    
    const response = await httpClient.get(`ranking?${queryParams.toString()}`);

    if (response.status === 401) {
      throw new Error('Brak autoryzacji - zaloguj się ponownie');
    }

    if (response.status === 429) {
      throw new Error('Zbyt wiele zapytań. Spróbuj ponownie za chwilę');
    }

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