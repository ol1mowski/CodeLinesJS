import { motion } from "framer-motion";
import { memo } from "react";
import { FaTrophy, FaStar, FaCalendarDay } from "react-icons/fa";
import { useRanking } from "../../../../Hooks/useRanking";

export const RankingStats = memo(() => {
  const { data, isLoading } = useRanking();
  const userStats = data?.userStats;

  console.log(data);
  

  if (isLoading) {
    return (
      <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg animate-pulse">
        <div className="h-6 w-32 bg-js/10 rounded mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-dark/20 rounded-lg p-4 border border-js/5">
              <div className="w-6 h-6 bg-js/10 rounded mb-2" />
              <div className="h-4 w-20 bg-js/10 rounded mb-2" />
              <div className="h-6 w-16 bg-js/10 rounded" />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  const stats = [
    {
      icon: FaTrophy,
      label: "Twoja pozycja",
      value: `#${userStats?.rank || '-'}`,
      change: userStats?.rankChange !== undefined 
        ? userStats.rankChange > 0 
          ? `+${userStats.rankChange}` 
          : userStats.rankChange.toString()
        : undefined,
      gradient: "from-js/20 to-js/30",
    },
    {
      icon: FaStar,
      label: "Poziom",
      value: userStats?.stats.level?.toLocaleString() || '-',
      change: userStats?.stats.level !== undefined
        ? userStats.stats.level > 0
          ? `+${userStats.stats.level}`
          : userStats.stats.level.toString()
        : undefined,
      gradient: "from-js/20 to-js/30",
    },
    {
      icon: FaCalendarDay,
      label: "Streak",
      value: userStats?.stats.streak?.toLocaleString() || '-',
      change: userStats?.stats.streak !== undefined
        ? userStats.stats.streak > 0
          ? `+${userStats.stats.streak}`
          : userStats.stats.streak.toString()
        : undefined,
      gradient: "from-js/20 to-js/30",
    },
  ];

  return (
    <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
      <h2 className="text-xl font-bold text-js mb-6">Twoje Statystyki</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map(stat => (
          <motion.div
            key={stat.label}
            className="bg-dark/20 rounded-lg p-4 border border-js/5"
            whileHover={{ scale: 1.02 }}
          >
            <stat.icon className="w-6 h-6 text-js mb-2" />
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-js">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

RankingStats.displayName = "RankingStats"; 