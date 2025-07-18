import { memo } from 'react';
import { GameStats } from '../types/asyncQuest.types';
import { GameIntro } from '../../GameIntro/GameIntro.component';
import { AsyncQuestStats } from '../AsyncQuestStats/AsyncQuestStats.component';
import { useAsyncQuestData } from '../hooks/useAsyncQuestData';

interface GameHeaderProps {
  isGameStarted: boolean;
  isGameOver: boolean;
  gameStats: GameStats;
  onGameStart: () => void;
}

export const GameHeader = memo(
  ({ isGameStarted, isGameOver, gameStats, onGameStart }: GameHeaderProps) => {
    const { gameContent } = useAsyncQuestData();

    if (!isGameStarted) {
      return gameContent ? (
        <GameIntro gameContent={gameContent} onStart={onGameStart} />
      ) : (
        <div className="w-full p-6 text-center">
          <p className="text-lg text-purple-200">Brak danych gry</p>
          <button
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
            onClick={onGameStart}
          >
            Rozpocznij mimo to
          </button>
        </div>
      );
    }

    return (
      <AsyncQuestStats
        stats={gameStats}
        isGameOver={isGameOver}
        finalTime={gameStats.timeElapsed}
      />
    );
  }
);

GameHeader.displayName = 'GameHeader';
