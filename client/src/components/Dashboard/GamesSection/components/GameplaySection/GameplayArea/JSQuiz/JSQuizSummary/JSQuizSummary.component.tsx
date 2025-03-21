import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaTrophy, FaCheck, FaRedo } from 'react-icons/fa';
import { QuizChallenge } from '../../../../../types/jsQuiz.types';
import { getCategoryIcon, getCategoryLabel } from '../JSQuizGame/JSQuizGame.utils';

type JSQuizSummaryProps = {
  score: number;
  timeElapsed: number;
  challenges: QuizChallenge[];
  correctAnswers: number;
  categoryStats: {
    basics: { total: number; correct: number; points: number };
    advanced: { total: number; correct: number; points: number };
    frameworks: { total: number; correct: number; points: number };
  };
  onRestart: () => void;
};

export const JSQuizSummary = memo(({
  score,
  timeElapsed,
  challenges,
  correctAnswers,
  categoryStats,
  onRestart
}: JSQuizSummaryProps) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const calculatePercentage = (correct: number, total: number): number => {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  const renderCategoryStats = () => {
    return Object.entries(categoryStats).map(([category, stats]) => {
      const CategoryIcon = getCategoryIcon(category as 'basics' | 'advanced' | 'frameworks');
      const percentage = calculatePercentage(stats.correct, stats.total);
      
      return (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 p-4 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <CategoryIcon className="text-blue-400" />
            <h3 className="text-lg font-medium">
              {getCategoryLabel(category as 'basics' | 'advanced' | 'frameworks')}
            </h3>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Poprawne: {stats.correct}/{stats.total}</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </div>
        </motion.div>
      );
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Koniec Quizu!</h2>
        <p className="text-gray-400">
          Ukończyłeś quiz z wynikiem {score} punktów, odpowiadając poprawnie na {correctAnswers} z {challenges.length} pytań.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
          <FaTrophy className="text-3xl text-yellow-400 mb-2" />
          <div className="text-xs text-gray-400">Punkty</div>
          <div className="text-2xl font-bold">{score}</div>
        </div>
        
        <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
          <FaCheck className="text-3xl text-green-400 mb-2" />
          <div className="text-xs text-gray-400">Poprawne odpowiedzi</div>
          <div className="text-2xl font-bold">{correctAnswers}/{challenges.length}</div>
        </div>
        
        <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
          <FaClock className="text-3xl text-blue-400 mb-2" />
          <div className="text-xs text-gray-400">Całkowity czas</div>
          <div className="text-2xl font-bold">{formatTime(timeElapsed)}</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h3 className="text-xl font-semibold mb-4">Wyniki według kategorii</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderCategoryStats()}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
        >
          <FaRedo />
          Zagraj jeszcze raz
        </button>
      </motion.div>
    </div>
  );
});

JSQuizSummary.displayName = 'JSQuizSummary'; 