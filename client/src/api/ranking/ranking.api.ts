import { RankingUser, RankingStats } from '../../types/ranking.types';

const BASE_URL = 'http://localhost:5001';

type RankingResponse = {
  users: RankingUser[];
  stats: RankingStats;
}

export const rankingApi = {
  getRanking: async (): Promise<RankingResponse> => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/api/ranking`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Nie udało się pobrać rankingu');
    }
    
    return response.json();
  }
}; 