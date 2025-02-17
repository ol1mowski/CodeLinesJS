import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BugFinderIntro } from './BugFinderIntro/BugFinderIntro.component';
import { BugFinderGame } from './BugFinderGame/BugFinderGame.component';
import { BugFinderSummary } from './BugFinderSummary/BugFinderSummary.component';
import { useBugFinder } from './hooks/useBugFinder';

export const BugFinder = memo(() => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const navigate = useNavigate();
  const { gameState, actions } = useBugFinder();

  const handleStartGame = useCallback(() => {
    setIsGameStarted(true);
  }, []);

  const handleRestart = useCallback(() => {
    actions.resetLevel();
    setIsGameStarted(false);
  }, [actions]);

  const handleExit = useCallback(() => {
    navigate('/dashboard/play');
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full"
    >
      {!isGameStarted && !gameState.isGameOver && (
        <BugFinderIntro onStartGame={handleStartGame} />
      )}
      
      {isGameStarted && !gameState.isGameOver && (
        <BugFinderGame />
      )}

      {gameState.isGameOver && (
        <BugFinderSummary 
          gameState={gameState}
          onRestart={handleRestart}
          onExit={handleExit}
        />
      )}
    </motion.div>
  );
});

BugFinder.displayName = 'BugFinder'; 