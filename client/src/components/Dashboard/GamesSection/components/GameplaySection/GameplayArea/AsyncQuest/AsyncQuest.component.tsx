import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAsyncQuestData } from './hooks/useAsyncQuestData';
import { useAsyncQuestState } from './hooks/useAsyncQuestState';
import { useAsyncQuestSEO } from './hooks/useAsyncQuestSEO';
import { LoadingError } from './components/LoadingError.component';
import { GameContent } from './components/GameContent.component';
import { GameHeader } from './components/GameHeader.component';

const AsyncQuest = memo(() => {
  const { gameContent, isLoading, error } = useAsyncQuestData();
  const { 
    isGameStarted, 
    isGameOver, 
    gameStats, 
    finalTime,
    currentChallenge,
    handleScoreUpdate,
    handleLevelComplete,
    handleGameOver,
    handleRestart,
    handleStartGame
  } = useAsyncQuestState({ gameContent, isPaused: false });
  
  const { pageTitle, pageDescription } = useAsyncQuestSEO();

  return (
    <div className="flex flex-col h-full text-white rounded-lg shadow-xl overflow-hidden">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <LoadingError isLoading={isLoading} error={error}>
        <div className="flex flex-col h-full">
          <GameHeader 
            isGameStarted={isGameStarted}
            isGameOver={isGameOver}
            gameStats={gameStats}
            onGameStart={handleStartGame}
          />
          
          {isGameStarted && (
            <GameContent 
              isGameOver={isGameOver}
              gameStats={gameStats}
              finalTime={finalTime}
              currentChallenge={currentChallenge}
              gameContent={gameContent}
              onScoreUpdate={handleScoreUpdate}
              onLevelComplete={handleLevelComplete}
              onGameOver={handleGameOver}
              onRestart={handleRestart}
            />
          )}
        </div>
      </LoadingError>
    </div>
  );
});

AsyncQuest.displayName = 'AsyncQuest';

export default AsyncQuest;