import { memo } from 'react';
import { motion } from 'framer-motion';
import { ScopeExplorerStats } from './ScopeExplorerStats/ScopeExplorerStats.component';
import { GameIntro } from '../GameIntro/GameIntro.component';
import { useScopeExplorerData } from './hooks/useScopeExplorerData';
import { useScopeExplorerGame } from './hooks/useScopeExplorerGame';
import { LoadingErrorContainer } from './components/LoadingErrorContainer.component';
import { GameContent } from './components/GameContent.component';
import { useAnimations } from './hooks/useAnimations';
import { SEO } from '../../../../../../../utils/seo.util';

const ScopeExplorer = memo(({ isPaused = false }: { isPaused?: boolean }) => {
  const { gameContent, isLoading, error } = useScopeExplorerData();
  const { containerAnimation } = useAnimations();
  

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
              <SEO
                title="Scope Explorer"
                description="Zagraj w Scope Explorer - gra programistyczna, która pomoże Ci zrozumieć zakresy zmiennych w JavaScript."
                type="website"
              />

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
