import { useQuery } from '@tanstack/react-query';
import { rankingApi } from '../../../../../api/ranking/ranking.api';
import { RankingPeriod } from '../../../../../types/ranking.types';

export const useRanking = (period: RankingPeriod) => {
  return useQuery({
    queryKey: ['ranking', period],
    queryFn: () => rankingApi.getRanking(period)
  });
}; 