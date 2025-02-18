import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BugFinderIntro } from './BugFinderIntro/BugFinderIntro.component';
import { BugFinderGame } from './BugFinderGame/BugFinderGame.component';
import { BugFinderSummary } from './BugFinderSummary/BugFinderSummary.component';
import { useBugFinder } from './hooks/useBugFinder';

export const BugFinder = memo(() => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { gameState, actions } = useBugFinder();
  const navigate = useNavigate();

  const handleStartGame = useCallback(() => {
    setIsGameStarted(true);
  }, []);

  const handleRestart = useCallback(() => {
    actions.resetGame();
    setIsGameStarted(true);
  }, [actions]);

  const handleExit = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <motion.div 
      className="min-h-screen bg-dark-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-7xl mx-auto p-4">
        {!isGameStarted && !gameState.showGameSummary && (
          <BugFinderIntro onStartGame={handleStartGame} />
        )}
        {isGameStarted && !gameState.showGameSummary && (
          <BugFinderGame />
        )}
        {gameState.showGameSummary && (
          <BugFinderSummary 
            gameState={gameState}
            onRestart={handleRestart}
            onExit={handleExit}
          />
        )}
      </div>
    </motion.div>
  );
});

BugFinder.displayName = 'BugFinder'; 