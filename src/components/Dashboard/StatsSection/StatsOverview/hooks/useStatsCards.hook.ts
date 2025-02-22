import { useMemo } from 'react';
import { FaTrophy, FaFire } from "react-icons/fa";
import { UserStats } from "../../../../../types/stats.types";
import { useFormatTime } from './useFormatTime.hook';

export const useStatsCards = (stats: UserStats | undefined) => {
  const formatTime = useFormatTime();

  return useMemo(() => {
    if (!stats) return [];
        
    return [
      {
        icon: FaTrophy,
        label: "Ukończone Lekcje",
        value: stats.data.completedLessons?.toString() || '0',
        gradient: "from-amber-500 to-orange-500"
      },
      {
        icon: FaFire,
        label: "Aktualny Streak",
        value: `${stats.data.streak || 0} dni`,
        subValue: `Najlepszy: ${stats.data.bestStreak || 0} dni`,
        gradient: "from-red-500 to-pink-500"
      },
    ];
  }, [stats, formatTime]);
}; 