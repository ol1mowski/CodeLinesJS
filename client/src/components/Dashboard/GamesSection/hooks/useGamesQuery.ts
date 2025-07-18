import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../api/fetchGames.api';

export const useGamesQuery = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: () => fetchGames(),
    select: data => ({
      games: data,
      pagination: data,
    }),
    staleTime: 5 * 60 * 1000,
  });
};
