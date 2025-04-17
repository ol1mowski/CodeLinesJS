import { useQuery } from '@tanstack/react-query';

import { useAuth } from '../../../../../hooks/useAuth';
import { API_URL } from '../../../../../config/api.config';

export interface RankingUserResponse {
  id: string;
  _id: string;
  username: string;
  points: number;
  level: number;
  avatar: string | null;
  position: number;
  rank: string;
  progress: {
    currentPoints: number;
    nextRankPoints: number;
    percentage: number;
  };
  stats?: {
    level: number;
    points: number;
  };
}

export interface RankingResponse {
  ranking: RankingUserResponse[];
  totalUsers: number;
  userStats: {
    rank: number;
    total: number;
    username: string;
    stats: {
      level: number;
      points: number;
    };
    isCurrentUser: boolean;
  };
}

const RANKING_QUERY_KEY = 'ranking';

const fetchRanking = async (
  token: string | null
): Promise<RankingResponse | RankingUserResponse[]> => {
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

export const useRanking = () => {
  const { token } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: [RANKING_QUERY_KEY],
    queryFn: () => fetchRanking(token),
    staleTime: 5 * 60 * 1000, // 5 minut
    retry: (failureCount, error) => {
      return failureCount < 3 && !error.message.includes('autoryzacji');
    },
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    error
  };
};
