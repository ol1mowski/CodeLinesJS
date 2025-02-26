import React, { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaClock } from 'react-icons/fa';
import { useUpdatePoints } from '../../../../../hooks/useUpdatePoints';

type JSTypoHunterSummaryProps = {
  score: number;
  timeElapsed: number;
  correctAnswers: number;
  totalLevels: number;
  onRestart: () => void;
};

export const JSTypoHunterSummary = memo(({ 
  score, 
  timeElapsed, 
  correctAnswers,
  totalLevels,
  onRestart 
}: JSTypoHunterSummaryProps) => {
  const { updatePoints } = useUpdatePoints();

  useEffect(() => {
    updatePoints(score);
  }, [score, updatePoints]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 bg-dark-800/50 border border-js/10 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-js mb-6 text-center">
        {correctAnswers === totalLevels ? 'Gratulacje!' : 'Koniec gry!'}
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-dark-900/50 rounded-lg flex items-center gap-3">
          <FaStar className="w-5 h-5 text-js" />
          <div>
            <div className="text-sm text-gray-400">Wynik końcowy</div>
            <div className="text-lg font-bold text-js">{score} punktów</div>
            <div className="text-xs text-gray-500">
              Poprawne odpowiedzi: {correctAnswers}/{totalLevels}
            </div>
          </div>
        </div>

        <div className="p-4 bg-dark-900/50 rounded-lg flex items-center gap-3">
          <FaClock className="w-5 h-5 text-js" />
          <div>
            <div className="text-sm text-gray-400">Czas ukończenia</div>
            <div className="text-lg font-bold text-js flex flex-wrap">{formatTime(timeElapsed)}</div>
          </div>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full px-6 py-3 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
      >
        Zagraj ponownie
      </button>
    </motion.div>
  );
});

JSTypoHunterSummary.displayName = 'JSTypoHunterSummary'; 