import { memo } from 'react';
import { motion } from 'framer-motion';
import { JSTypoHunterStats } from './JSTypoHunterStats/JSTypoHunterStats.component';
import { GameIntro } from '../GameIntro/GameIntro.component';
import { useGameData } from './hooks/useGameData';
import { useGameState } from './hooks/useGameState';
import { LoadingError } from './components/LoadingError.component';
import { GameContent } from './components/GameContent.component';
import { SEO } from '../../../../../../../utils/seo.util';  

const JSTypoHunter = memo(({ isPaused = false }: { isPaused?: boolean }) => {
  const { gameContent, isLoading, error } = useGameData(); 

  const {
    isGameStarted,
    isGameOver,
    gameStats,
    finalTime,
    currentChallenge,
    handleScoreUpdate,
    handleIncorrectAnswer,
    handleLevelComplete,
    handleRestart,
    handleStartGame,
  } = useGameState({
    gameContent,
    isPaused,
  });

  return (
    <LoadingError isLoading={isLoading} error={error}>
      {gameContent && (
        <>
          {!isGameStarted ? (
            <GameIntro gameContent={gameContent} onStart={handleStartGame} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full space-y-6"
            >
              <SEO
                title="JSTypoHunter"
                description="Zagraj w JSTypoHunter - gra programistyczna, która pomoże Ci zrozumieć typowanie w JavaScript."
                type="website"
              />

              <JSTypoHunterStats stats={gameStats} />

              <GameContent
                isGameOver={isGameOver}
                gameStats={gameStats}
                finalTime={finalTime}
                currentChallenge={currentChallenge}
                totalLevels={gameContent?.gameData?.length || 0}
                onScoreUpdate={handleScoreUpdate}
                onLevelComplete={handleLevelComplete}
                onIncorrectAnswer={handleIncorrectAnswer}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </>
      )}
    </LoadingError>
  );
});

JSTypoHunter.displayName = 'JSTypoHunter';

export default JSTypoHunter;
