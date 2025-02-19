import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaStar, FaCode, FaCube, FaArrowUp } from 'react-icons/fa';
import { ScopeChallenge } from '../../../../../types/scopeExplorer.types';

type CategoryStats = {
  total: number;
  points: number;
  correct: number;
};

type ScopeExplorerSummaryProps = {
  score: number;
  timeElapsed: number;
  challenges: ScopeChallenge[];
  correctAnswers: number;
  categoryStats: Record<'scope' | 'closure' | 'hoisting', CategoryStats>;
  onRestart: () => void;
};

export const ScopeExplorerSummary = memo(({ 
  score, 
  timeElapsed, 
  challenges,
  correctAnswers,
  categoryStats,
  onRestart 
}: ScopeExplorerSummaryProps) => {
  const stats = useMemo(() => {
    const categoryStats: Record<string, CategoryStats> = {
      scope: { total: 0, points: 0, correct: 0 },
      closure: { total: 0, points: 0, correct: 0 },
      hoisting: { total: 0, points: 0, correct: 0 }
    };

    challenges.forEach(challenge => {
      categoryStats[challenge.category].total++;
      categoryStats[challenge.category].points += challenge.points || 0;
    });

    return categoryStats;
  }, [challenges]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'scope':
        return FaCode;
      case 'closure':
        return FaCube;
      case 'hoisting':
        return FaArrowUp;
      default:
        return FaCode;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 bg-dark-800/50 border border-js/10 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-js mb-6 text-center">
        {correctAnswers === challenges.length ? 'Gratulacje!' : 'Koniec gry!'}
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-dark-900/50 rounded-lg flex items-center gap-3">
          <FaStar className="w-5 h-5 text-js" />
          <div>
            <div className="text-sm text-gray-400">Wynik końcowy</div>
            <div className="text-lg font-bold text-js">{score} punktów</div>
            <div className="text-xs text-gray-500">
              Poprawne odpowiedzi: {correctAnswers}/{challenges.length}
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

      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-js">Statystyki kategorii:</h3>
        {Object.entries(categoryStats).map(([category, stat]) => {
          const Icon = getCategoryIcon(category);
          return (
            <div key={category} className="flex items-center justify-between p-3 bg-dark-900/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-js/10">
                  <Icon className="w-4 h-4 text-js" />
                </div>
                <div>
                  <div className="text-sm font-medium text-js">
                    {category === 'scope' ? 'Zakres zmiennych' :
                     category === 'closure' ? 'Domknięcia' : 'Hoisting'}
                  </div>
                  <div className="text-xs text-gray-400">
                    Ukończone zadania: {stat.correct}/{stat.total}
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-js">
                {stat.points} pkt
              </div>
            </div>
          );
        })}
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

ScopeExplorerSummary.displayName = 'ScopeExplorerSummary'; 