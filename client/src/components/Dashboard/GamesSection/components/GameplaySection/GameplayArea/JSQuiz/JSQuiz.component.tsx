import { memo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useJSQuizData } from './hooks/useJSQuizData';
import { useJSQuizGame } from './hooks/useJSQuizGame';
import { useJSQuizSEO } from './hooks/useJSQuizSEO';
import { LoadingErrorContainer } from './components/LoadingErrorContainer.component';
import { GameContent } from './components/GameContent.component';
import { GameHeader } from './components/GameHeader.component';
import { useAnimations } from './hooks/useAnimations';

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
    handleGameOver
  } = useJSQuizGame({
    gameContent,
    isPaused
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
            <motion.div
              {...containerAnimation}
              className="w-full h-full flex flex-col bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 text-white rounded-lg shadow-xl overflow-hidden"
            >
              <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
              </Helmet>
              
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

export default JSQuiz;

JSQuiz.displayName = 'JSQuiz'; 