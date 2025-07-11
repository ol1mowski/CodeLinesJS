import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';
import { PerformanceLevel } from '../../../hooks/useResultsScreen.hook';

interface MainResultCardProps {
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  performance: PerformanceLevel;
}

export const MainResultCard: React.FC<MainResultCardProps> = memo(({
  correctAnswers,
  totalQuestions,
  percentage,
  performance
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-8 mb-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mb-6"
      >
        <FaTrophy className="text-js text-6xl mx-auto mb-4" />
        <div className="text-white text-4xl font-bold mb-2">
          {correctAnswers}/{totalQuestions}
        </div>
        <div className="text-js text-2xl font-bold mb-4">
          {percentage}% poprawnych odpowiedzi
        </div>
        <div className={`inline-block px-6 py-3 rounded-full ${performance.bgColor} ${performance.color} font-medium text-lg`}>
          {performance.level}
        </div>
      </motion.div>
    </motion.div>
  );
});

MainResultCard.displayName = 'MainResultCard'; 