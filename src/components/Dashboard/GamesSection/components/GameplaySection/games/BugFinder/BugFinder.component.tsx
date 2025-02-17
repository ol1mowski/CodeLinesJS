import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { BugFinderIntro } from './BugFinderIntro/BugFinderIntro.component';
import { BugFinderGame } from './BugFinderGame/BugFinderGame.component';

export const BugFinder = memo(() => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full"
    >
      {!isGameStarted ? (
        <BugFinderIntro onStartGame={handleStartGame} />
      ) : (
        <BugFinderGame />
      )}
    </motion.div>
  );
});

BugFinder.displayName = 'BugFinder'; 