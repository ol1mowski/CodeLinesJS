import { useMemo } from 'react';
import { FaTrophy, FaFire } from 'react-icons/fa';
import { LegacyUserStats } from '../../../../../types/stats.types';

export const useStatsCards = (stats: LegacyUserStats | undefined) => {
  return useMemo(() => {
    if (!stats) return [];

    return [
      {
        id: 'completed-lessons',
        icon: FaTrophy,
        label: 'Ukończone Lekcje',
        value: stats.data.achievements.completedChallenges?.toString() || '0',
        gradient: 'from-amber-500 to-orange-500',
      },
      {
        id: 'current-streak',
        icon: FaFire,
        label: 'Aktualny Streak',
        value: `${stats.data.achievements.streak.current || 0} dni`,
        subValue: `Najlepszy: ${stats.data.achievements.streak.best || 0} dni`,
        gradient: 'from-red-500 to-pink-500',
      },
    ];
  }, [stats]);
};
