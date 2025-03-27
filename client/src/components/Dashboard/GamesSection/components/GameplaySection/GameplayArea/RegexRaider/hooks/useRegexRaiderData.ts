import { useMemo } from 'react';
import { useGamesQuery } from '../../../../../hooks/useGamesQuery';
import { Game } from '../../../../../types/games.types';

export const useRegexRaiderData = () => {
  const { data, isLoading, error } = useGamesQuery();
  
  const gameContent = useMemo(() => 
    data?.games.find((game: Game) => game.slug === 'regex-raider'), 
    [data?.games]
  );

  return {
    gameContent,
    isLoading,
    error
  };
}; 