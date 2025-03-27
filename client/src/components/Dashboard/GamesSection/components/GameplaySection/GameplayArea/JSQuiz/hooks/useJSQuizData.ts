import { useMemo } from 'react';
import { QuizChallenge } from '../../../../../types/jsQuiz.types';
import { useGamesQuery } from '../../../../../hooks/useGamesQuery';

type Game = {
  slug: string;
  estimatedTime: number;
  gameData: QuizChallenge[];
};

export const useJSQuizData = () => {
  const { data, isLoading, error } = useGamesQuery();
  
  const gameContent = useMemo(() => {
    if (!data || !data.games || !Array.isArray(data.games)) {
      return undefined;
    }
    return data.games.find((game: Game) => game.slug === 'js-quiz');
  }, [data]);

  return {
    gameContent,
    isLoading,
    error
  };
}; 