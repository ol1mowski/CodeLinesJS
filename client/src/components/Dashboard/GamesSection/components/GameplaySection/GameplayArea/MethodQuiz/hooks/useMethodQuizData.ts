import { useMemo } from 'react';
import { MethodQuizChallenge } from '../../../../../types/methodQuiz.types';
import { useGamesQuery } from '../../../../../hooks/useGamesQuery';

type Game = {
  slug: string;
  estimatedTime: number;
  gameData: MethodQuizChallenge[];
};

export const useMethodQuizData = () => {
  const { data, isLoading, error } = useGamesQuery();

  const gameContent = useMemo(() => {
    if (!data || !data.games || !Array.isArray(data.games)) {
      return undefined;
    }
    return data.games.find((game: Game) => game.slug === 'method-quiz');
  }, [data]);

  return {
    gameContent,
    isLoading,
    error,
  };
}; 