import { memo } from 'react';
import { GameStats } from '../../../../../types/jsQuiz.types';
import { GameIntro } from '../../GameIntro/GameIntro.component';
import { JSQuizStats } from '../JSQuizStats/JSQuizStats.component';
import { useJSQuizData } from '../hooks/useJSQuizData';

interface GameHeaderProps {
  isGameStarted: boolean;
  isGameOver: boolean;
  gameStats: GameStats;
  onGameStart: () => void;
}

export const GameHeader = memo(({
  isGameStarted,
  isGameOver,
  gameStats,
  onGameStart
}: GameHeaderProps) => {
  const { gameContent } = useJSQuizData();

  if (!isGameStarted) {
    return gameContent ? (
      <GameIntro gameContent={gameContent} onStart={onGameStart} />
    ) : (
      <div className="w-full p-6 text-center">
        <p className="text-lg text-js/80">Brak danych gry</p>
        <button
          className="mt-4 px-6 py-2 bg-js/80 hover:bg-js text-white rounded-md transition-colors"
          onClick={onGameStart}
        >
          Rozpocznij mimo to
        </button>
      </div>
    );
  }

  return (
    <JSQuizStats 
      stats={gameStats}
      isGameOver={isGameOver}
      finalTime={gameStats.timeElapsed}
    />
  );
});

GameHeader.displayName = 'GameHeader'; 