import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';

interface StatsCardProps {
  correctAnswers: number;
  totalQuestions: number;
  totalTime: number;
  formatTime: (seconds: number) => string;
}

export const StatsCard: React.FC<StatsCardProps> = memo(({
  correctAnswers,
  totalQuestions,
  totalTime,
  formatTime
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <FaChartLine className="text-js text-xl" />
        <h3 className="text-white text-lg font-bold">Statystyki</h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Poprawne:</span>
          <span className="text-green-400 font-medium">{correctAnswers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Błędne:</span>
          <span className="text-red-400 font-medium">{totalQuestions - correctAnswers}</span>
        </div>
        {totalTime > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400">Czas całkowity:</span>
            <span className="text-white font-medium">{formatTime(totalTime)}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
});

StatsCard.displayName = 'StatsCard'; 