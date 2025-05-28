import { motion } from 'framer-motion';
import { memo } from 'react';
import { FaTrophy, FaStar, FaCalendarDay } from 'react-icons/fa';
import { StatCard } from './components/StatCard';
import { LoadingScreen } from '../../../UI/LoadingScreen/LoadingScreen.component';

interface ProcessedUserStats {
  username?: string;
  rank: number | string;
  level: number | string;
  points: number | string;
}

interface RankingStatsProps {
  currentUserStats: ProcessedUserStats | null;
  isLoading?: boolean;
}

export const RankingStats = memo(({ currentUserStats, isLoading = false }: RankingStatsProps) => {
  if (isLoading) {
    return (
      <div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
        <LoadingScreen />
      </div>
    );
  }

  if (!currentUserStats) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg"
      >
        <h2 className="text-xl font-bold text-js mb-6">Twoje Statystyki</h2>
        <p className="text-gray-400">
          Nie udało się załadować twoich statystyk. Zaloguj się, aby zobaczyć swoje miejsce w
          rankingu.
        </p>
      </motion.div>
    );
  }

  const stats = [
    {
      icon: FaTrophy,
      label: 'Twoja pozycja',
      value: `#${currentUserStats.rank}`,
    },
    {
      icon: FaStar,
      label: 'Poziom',
      value:
        typeof currentUserStats.level === 'number'
          ? currentUserStats.level.toLocaleString()
          : currentUserStats.level,
    },
    {
      icon: FaCalendarDay,
      label: 'Punkty',
      value:
        typeof currentUserStats.points === 'number'
          ? currentUserStats.points.toLocaleString()
          : currentUserStats.points,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold text-js mb-6">
        Twoje Statystyki {currentUserStats.username && `(${currentUserStats.username})`}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map(stat => (
          <StatCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} />
        ))}
      </div>
    </motion.div>
  );
});

RankingStats.displayName = 'RankingStats';
