import { useMemo } from 'react';
import { ScopeChallenge } from '../../../../../types/scopeExplorer.types';
import { useGamesQuery } from '../../../../../hooks/useGamesQuery';

type Game = {
  slug: string;
  estimatedTime: number;
  gameData: ScopeChallenge[];
};

export const useScopeExplorerData = () => {
  const { data, isLoading, error } = useGamesQuery();
  
  const gameContent = useMemo(() => 
    data?.games.find((game: Game) => game.slug === 'scope-explorer'), 
    [data?.games]
  );

  return {
    gameContent,
    isLoading,
    error
  };
}; 