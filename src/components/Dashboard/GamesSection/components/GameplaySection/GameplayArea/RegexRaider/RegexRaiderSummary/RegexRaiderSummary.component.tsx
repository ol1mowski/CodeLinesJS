import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaClock, FaTrophy } from 'react-icons/fa';

type RegexRaiderSummaryProps = {
  score: number;
  timeElapsed: number;
  correctAnswers: number;
  totalLevels: number;
  onRestart: () => void;
};

export const RegexRaiderSummary = memo(({ 
  score, 
  timeElapsed, 
  correctAnswers,
  totalLevels,
  onRestart 
}: RegexRaiderSummaryProps) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const accuracy = Math.round((correctAnswers / totalLevels) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 bg-dark-800/50 border border-js/10 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-js mb-6 text-center">
        {correctAnswers === totalLevels ? 'Gratulacje!' : 'Koniec gry!'}
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-dark-900/50 rounded-lg flex items-center gap-3">
          <FaStar className="w-5 h-5 text-js" />
          <div>
            <div className="text-sm text-gray-400">Wynik końcowy</div>
            <div className="text-lg font-bold text-js">{score} punktów</div>
          </div>
        </div>

        <div className="p-4 bg-dark-900/50 rounded-lg flex items-center gap-3">
          <FaTrophy className="w-5 h-5 text-js" />
          <div>
            <div className="text-sm text-gray-400">Skuteczność</div>
            <div className="text-lg font-bold text-js">{accuracy}%</div>
            <div className="text-xs text-gray-500">
              {correctAnswers}/{totalLevels} poprawnych
            </div>
          </div>
        </div>

        <div className="p-4 bg-dark-900/50 rounded-lg flex items-center gap-3">
          <FaClock className="w-5 h-5 text-js" />
          <div>
            <div className="text-sm text-gray-400">Czas ukończenia</div>
            <div className="text-lg font-bold text-js">{formatTime(timeElapsed)}</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-js text-dark font-medium rounded-lg hover:bg-js/90 transition-colors"
        >
          Zagraj ponownie
        </button>
      </div>
    </motion.div>
  );
});

RegexRaiderSummary.displayName = 'RegexRaiderSummary'; 