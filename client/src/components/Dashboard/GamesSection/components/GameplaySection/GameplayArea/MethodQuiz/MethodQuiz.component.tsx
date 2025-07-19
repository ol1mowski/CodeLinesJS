import { memo } from 'react';
import { motion } from 'framer-motion';
import { useMethodQuizData } from './hooks/useMethodQuizData';
import { LoadingErrorContainer } from './components/LoadingErrorContainer.component';
import { useAnimations } from './hooks/useAnimations';
import { useMethodQuizSEO } from './hooks/useMethodQuizSEO';
import { useMethodQuizGame } from './hooks/useMethodQuizGame';
import { GameContent } from './components/GameContent.component';
import { SEO } from '../../../../../../../utils/seo.util';

const GameHeader = ({ isGameStarted, onGameStart, gameStats }: any) => {
  if (isGameStarted) {
    return (
      <div className="flex items-center justify-between p-4 bg-dark-800/50 border-b border-js/10">
        <h2 className="text-xl font-bold text-white">Method Quiz</h2>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>Poziom: {gameStats.currentLevel}/{gameStats.totalLevels}</span>
          <span>Punkty: {gameStats.score}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Method Quiz</h1>
      <p className="text-gray-400 text-center mb-8 max-w-md">
        Sprawdź swoją znajomość metod JavaScript! Uzupełnij brakujące metody w fragmentach kodu.
      </p>
      <button
        onClick={onGameStart}
        className="bg-js hover:bg-js/80 text-dark px-8 py-3 rounded-lg font-medium text-lg transition-colors"
      >
        Rozpocznij Quiz
      </button>
    </div>
  );
};

const MethodQuiz = memo(({ isPaused = false }: { isPaused?: boolean }) => {
  const { gameContent, isLoading, error } = useMethodQuizData();
  const { containerAnimation } = useAnimations();
  const { pageTitle, pageDescription } = useMethodQuizSEO();

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
  } = useMethodQuizGame({
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

MethodQuiz.displayName = 'MethodQuiz';

export default MethodQuiz; 