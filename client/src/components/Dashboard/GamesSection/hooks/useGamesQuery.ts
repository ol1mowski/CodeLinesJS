import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../api/fetchGames.api';
import { useAuth } from '../../../../hooks/useAuth';

export const useGamesQuery = () => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ['games'],
    queryFn: () => fetchGames(token || ''),
    select: data => ({
      games: data.data,
      pagination: data.data,
    }),
    staleTime: 5 * 60 * 1000,
  });
};
