import { useMemo } from 'react';
import { useGamesQuery } from '../../../../../hooks/useGamesQuery';
import { Game } from '../../../../../types/games.types';

export const useAsyncQuestData = () => {
  const { data, isLoading, error } = useGamesQuery();

  const gameContent = useMemo(() => {
    if (!data || !data.games || !Array.isArray(data.games)) {
      return undefined;
    }
    return data.games.find((game: Game) => game.slug === 'async-quest');
  }, [data]);

  return {
    gameContent,
    isLoading,
    error,
  };
};
