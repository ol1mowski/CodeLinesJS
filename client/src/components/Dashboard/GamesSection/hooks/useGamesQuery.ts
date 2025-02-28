import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../api/fetchGames.api';
import { useAuth } from '../../../../Hooks/useAuth';

export const useGamesQuery = () => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['games'],
    queryFn: () => fetchGames(token || ''),
    select: (data) => ({
      games: data.data.games,
      pagination: data.data.pagination,
    }),
    staleTime: 5 * 60 * 1000,
  });
};