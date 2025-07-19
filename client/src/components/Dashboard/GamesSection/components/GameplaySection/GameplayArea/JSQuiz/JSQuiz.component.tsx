import { memo } from 'react';
import { motion } from 'framer-motion';
import { useJSQuizData } from './hooks/useJSQuizData';
import { useJSQuizGame } from './hooks/useJSQuizGame';
import { useJSQuizSEO } from './hooks/useJSQuizSEO';
import { LoadingErrorContainer } from './components/LoadingErrorContainer.component';
import { GameContent } from './components/GameContent.component';
import { GameHeader } from './components/GameHeader.component';
import { useAnimations } from './hooks/useAnimations';
import { SEO } from '../../../../../../../utils/seo.util';

const JSQuiz = memo(({ isPaused = false }: { isPaused?: boolean }) => {
  const { gameContent, isLoading, error } = useJSQuizData();  
  const { containerAnimation } = useAnimations();
  const { pageTitle, pageDescription } = useJSQuizSEO();

  const {
    isGameStarted,
    isGameOver,
    finalTime,
    gameStats,
    currentChallenge,
    handleScoreUpdate,
    handleLevelComplete,
    handleRestart,
    handleStartGame,
    handleGameOver,
  } = useJSQuizGame({
    gameContent,
    isPaused,
  });

  return (
    <LoadingErrorContainer isLoading={isLoading} error={error}>
      {gameContent && (
        <>
          {!isGameStarted ? (
            <GameHeader
              isGameStarted={isGameStarted}
              isGameOver={isGameOver}
              gameStats={gameStats}
              onGameStart={handleStartGame}
            />
          ) : (
            <motion.div {...containerAnimation} className="w-full h-full flex flex-col">
              <SEO
                title={pageTitle}
                description={pageDescription}
                type="website"
              />

              <GameHeader
                isGameStarted={isGameStarted}
                isGameOver={isGameOver}
                gameStats={gameStats}
                onGameStart={handleStartGame}
              />

              <GameContent
                isGameOver={isGameOver}
                gameStats={gameStats}
                currentChallenge={currentChallenge}
                finalTime={finalTime}
                gameContent={gameContent}
                onScoreUpdate={handleScoreUpdate}
                onLevelComplete={handleLevelComplete}
                onGameOver={handleGameOver}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </>
      )}
    </LoadingErrorContainer>
  );
});

JSQuiz.displayName = 'JSQuiz';

export default JSQuiz;
