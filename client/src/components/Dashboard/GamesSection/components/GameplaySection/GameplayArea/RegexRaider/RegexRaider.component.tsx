import { memo } from 'react';
import { motion } from 'framer-motion';
import { RegexRaiderStats } from './RegexRaiderStats/RegexRaiderStats.component';
import { GameIntro } from '../GameIntro/GameIntro.component';
import { useRegexRaiderData } from './hooks/useRegexRaiderData';
import { useRegexRaiderGame } from './hooks/useRegexRaiderGame';
import { useAnimations } from './hooks/useAnimations';
import { LoadingErrorContainer } from './components/LoadingErrorContainer.component';
import { GameContent } from './components/GameContent.component';
import { SEO } from '../../../../../../../utils/seo.util';

const RegexRaider = memo(({ isPaused = false }: { isPaused?: boolean }) => {
  const { gameContent, isLoading, error } = useRegexRaiderData();
  const { containerAnimation } = useAnimations();

  const {
    isGameStarted,
    isGameOver,
    finalTime,
    gameStats,
    handleScoreUpdate,
    handleLevelComplete,
    handleRestart,
    handleStartGame,
    handleGameOver,
  } = useRegexRaiderGame({
    gameContent,
    isPaused,
  });

  return (
    <LoadingErrorContainer isLoading={isLoading} error={error}>
      {gameContent && (
        <>
          {!isGameStarted ? (
            <GameIntro gameContent={gameContent} onStart={handleStartGame} />
          ) : (
            <motion.div {...containerAnimation} className="w-full space-y-6">
              <SEO
                title="Regex Raider"
                description="Zagraj w Regex Raider - gra programistyczna, która pomoże Ci zrozumieć wyrażenia regularne w JavaScript."
                type="website"
              />

              <RegexRaiderStats stats={gameStats} isGameOver={isGameOver} finalTime={finalTime} />

              <GameContent
                isGameOver={isGameOver}
                gameStats={gameStats}
                finalTime={finalTime}
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

RegexRaider.displayName = 'RegexRaider';

export default RegexRaider;
