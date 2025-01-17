import { RankingUser } from '../../types/ranking.types';

const BASE_URL = 'http://localhost:5001';

export const rankingApi = {
  getRanking: async (period: string): Promise<RankingUser[]> => {
    const response = await fetch(`${BASE_URL}/api/ranking?period=${period}`);
    if (!response.ok) {
      throw new Error('Failed to fetch ranking');
    }
    return response.json();
  }
}; 