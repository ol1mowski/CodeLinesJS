import { useMemo } from 'react';
import { FaTrophy, FaFire } from "react-icons/fa";
import { UserStats } from "../../../../../types/stats.types";

export const useStatsCards = (stats: UserStats | undefined) => {
  return useMemo(() => {
    if (!stats) return [];
        
    return [
      {
        icon: FaTrophy,
        label: "Ukończone Lekcje",
        value: stats.data.completedChallenges?.toString() || '0',
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
  }, [stats]);
}; 