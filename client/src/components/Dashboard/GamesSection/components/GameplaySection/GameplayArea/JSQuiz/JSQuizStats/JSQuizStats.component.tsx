import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaTrophy, FaCheck } from 'react-icons/fa';
import { GameStats } from '../../../../../types/jsQuiz.types';

type JSQuizStatsProps = {
  stats: GameStats;
  isGameOver: boolean;
  finalTime: number;
};

export const JSQuizStats = memo(({ stats, isGameOver, finalTime }: JSQuizStatsProps) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const displayTime = isGameOver ? finalTime : stats.timeElapsed;
  
  return (
    <div className="w-full p-4 bg-dark-800/50 rounded-lg mb-4">
      <div className="grid grid-cols-3 gap-4">
        <motion.div 
          className="flex items-center gap-2 text-js"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FaTrophy className="text-lg" />
          <div>
            <div className="text-xs text-gray-400">Punkty</div>
            <div className="font-semibold">{stats.score}</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2 text-green-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaCheck className="text-lg" />
          <div>
            <div className="text-xs text-gray-400">Poprawne</div>
            <div className="font-semibold">{stats.correctAnswers} / {stats.totalLevels}</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2 text-js"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaClock className="text-lg" />
          <div>
            <div className="text-xs text-gray-400">Czas</div>
            <div className="font-semibold">{formatTime(displayTime)}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

JSQuizStats.displayName = 'JSQuizStats'; 