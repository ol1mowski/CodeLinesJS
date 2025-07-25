import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaStar, FaClock } from 'react-icons/fa';
import { GameStats } from '../types/asyncQuest.types';
import { CategoryProgress } from '../CategoryProgress/CategoryProgress.component';

type AsyncQuestStatsProps = {
  stats: GameStats;
  isGameOver: boolean;
  finalTime: number;
};

export const AsyncQuestStats = memo(({ stats, isGameOver, finalTime }: AsyncQuestStatsProps) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const displayTime = isGameOver ? finalTime : stats.timeElapsed;

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="bg-dark-800/50 border border-js/10 rounded-lg p-4 flex items-center gap-3">
          <FaCode className="w-5 h-5 text-js" />
          <div>
            <div className="text-sm text-gray-400">Poziom</div>
            <div className="text-lg font-bold text-js">
              {stats.currentLevel}/{stats.totalLevels}
            </div>
          </div>
        </div>

        <div className="bg-dark-800/50 border border-js/10 rounded-lg p-4 flex items-center gap-3">
          <FaStar className="w-5 h-5 text-js" />
          <div>
            <div className="text-sm text-gray-400">Punkty</div>
            <div className="text-lg font-bold text-js">{stats.score}</div>
            <div className="text-xs text-gray-500">
              Poprawne: {stats.correctAnswers}/{stats.totalLevels}
            </div>
          </div>
        </div>

        <div className="bg-dark-800/50 border border-js/10 rounded-lg p-4 flex items-center gap-3">
          <FaClock className="w-5 h-5 text-js" />
          <div className="w-full">
            <div className="text-sm text-gray-400">Czas</div>
            <div className="text-lg font-bold text-js flex flex-wrap w-full">
              <span className="block w-full break-words">
                {formatTime(displayTime)}/{formatTime(stats.maxTime)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <CategoryProgress category="promises" stats={stats.categoryStats.promises} />
        <CategoryProgress category="async-await" stats={stats.categoryStats['async-await']} />
        <CategoryProgress category="callbacks" stats={stats.categoryStats.callbacks} />
      </motion.div>
    </div>
  );
});

AsyncQuestStats.displayName = 'AsyncQuestStats';
