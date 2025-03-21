import { useMemo } from 'react';
import { useGamesQuery } from '../../../../../hooks/useGamesQuery';
import { Game } from '../../../../../types/games.types';

export const useGameData = () => {
  const { data, isLoading, error } = useGamesQuery();
  
  const gameContent = useMemo(() => {
    return data?.games.find((game: Game) => game.slug === 'js-typo-hunter');
  }, [data]);
  
  return {
    gameContent,
    isLoading,
    error
  };
}; 