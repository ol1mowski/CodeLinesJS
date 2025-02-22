import { useMemo } from 'react';
import { FaTrophy, FaFire, FaClock, FaStar } from "react-icons/fa";
import { UserStats } from "../../../../../types/stats.types";
import { useFormatTime } from './useFormatTime.hook';

export const useStatsCards = (stats: UserStats | undefined) => {
  const formatTime = useFormatTime();

  return useMemo(() => {
    if (!stats) return [];
        
    return [
      {
        icon: FaTrophy,
        label: "Ukończone Wyzwania",
        value: stats.completedChallenges?.toString() || '0',
        gradient: "from-amber-500 to-orange-500"
      },
      {
        icon: FaFire,
        label: "Aktualny Streak",
        value: `${stats.currentStreak || 0} dni`,
        subValue: `Najlepszy: ${stats.bestStreak || 0} dni`,
        gradient: "from-red-500 to-pink-500"
      },
      {
        icon: FaStar,
        label: "Średni Wynik",
        value: `${stats.averageScore || 0}%`,
        gradient: "from-indigo-500 to-purple-500"
      },
      {
        icon: FaClock,
        label: "Czas Nauki",
        value: formatTime(stats.totalTimeSpent || 0),
        gradient: "from-emerald-500 to-teal-500"
      }
    ];
  }, [stats, formatTime]);
}; 