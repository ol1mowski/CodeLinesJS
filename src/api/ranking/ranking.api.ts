import { RankingUser, RankingPeriod } from '../../types/ranking.types';

const BASE_URL = 'http://localhost:5001';

export const rankingApi = {
  getRanking: async (period: RankingPeriod): Promise<RankingUser[]> => {
    const response = await fetch(`${BASE_URL}/api/ranking?period=${period}`);
    
    if (!response.ok) {
      throw new Error('Nie udało się pobrać rankingu');
    }
    
    return response.json();
  }
}; 