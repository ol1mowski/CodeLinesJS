import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { GameStats } from '../../../../types/jsTypoHunter.types';
import { JSTypoHunterStats } from './JSTypoHunterStats/JSTypoHunterStats.component';
import { JSTypoHunterGame } from './JSTypoHunterGame/JSTypoHunterGame.component';
import { challenges } from '../../../../data/challenges.data';

export const JSTypoHunter = memo(() => {
  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: challenges.length,
    score: 0,
    timeElapsed: 0,
    maxTime: 300 
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      <JSTypoHunterStats stats={gameStats} />
      <JSTypoHunterGame 
        currentChallenge={challenges[gameStats.currentLevel - 1]}
        onScoreUpdate={(newScore) => 
          setGameStats(prev => ({ ...prev, score: newScore }))
        }
        onLevelComplete={() => 
          setGameStats(prev => ({ ...prev, currentLevel: prev.currentLevel + 1 }))
        }
      />
    </motion.div>
  );
});

JSTypoHunter.displayName = 'JSTypoHunter'; 