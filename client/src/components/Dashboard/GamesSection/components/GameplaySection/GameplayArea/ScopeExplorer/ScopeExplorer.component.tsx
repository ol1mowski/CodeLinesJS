import { memo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ScopeExplorerStats } from './ScopeExplorerStats/ScopeExplorerStats.component';
import { GameIntro } from '../GameIntro/GameIntro.component';
import { useScopeExplorerData } from './hooks/useScopeExplorerData';
import { useScopeExplorerGame } from './hooks/useScopeExplorerGame';
import { LoadingErrorContainer } from './components/LoadingErrorContainer.component';
import { GameContent } from './components/GameContent.component';
import { useAnimations } from './hooks/useAnimations';
import { useSEO } from '../../../../../../../hooks/useSEO';

const ScopeExplorer = memo(({ isPaused = false }: { isPaused?: boolean }) => {
  const { gameContent, isLoading, error } = useScopeExplorerData();
  const { containerAnimation } = useAnimations();
  const { pageTitle, pageDescription } = useSEO();

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
  } = useScopeExplorerGame({
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
            <motion.div {...containerAnimation} className="w-full h-full flex flex-col">
              <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
              </Helmet>

              <ScopeExplorerStats stats={gameStats} isGameOver={isGameOver} finalTime={finalTime} />

              <GameContent
                isGameOver={isGameOver}
                gameStats={gameStats}
                currentChallenge={currentChallenge}
                finalTime={finalTime}
                challenges={gameContent.gameData}
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

export default ScopeExplorer;

ScopeExplorer.displayName = 'ScopeExplorer';
