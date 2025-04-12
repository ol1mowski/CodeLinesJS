import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { FaTrophy, FaStar, FaCalendarDay } from "react-icons/fa";
import { useRanking } from "./hooks/useRanking";

export const RankingStats = memo(() => {
  const { data, isLoading } = useRanking();
  
  const currentUser = useMemo(() => {
    if (!data) return null;
    
    if (Array.isArray(data)) {
      return data.find(u => u.rank !== undefined || u.position !== undefined);
    } 
    else if (data && typeof data === 'object') {
      const dataObj: any = data;
      
      if (dataObj.userStats) {
        return dataObj.userStats;
      }
      else if (dataObj.rank !== undefined || dataObj.position !== undefined) {
        return dataObj;
      }
    }
    
    return null;
  }, [data]);
  
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

  const getUserRank = () => {
    if (!currentUser) return '-';
    if ('position' in currentUser) return currentUser.position;
    if ('rank' in currentUser) return currentUser.rank;
    return '-';
  };
  
  const getUserLevel = () => {
    if (!currentUser) return '-';
    if ('level' in currentUser) return currentUser.level;
    return '-';
  };
  
  const getUserPoints = () => {
    if (!currentUser) return '-';
    if ('points' in currentUser) return currentUser.points;
    if ('streak' in currentUser) return currentUser.streak;
    return '-';
  };
  
  const stats = [
    {
      icon: FaTrophy,
      label: "Twoja pozycja",
      value: `#${getUserRank()}`,
      gradient: "from-js/20 to-js/30",
    },
    {
      icon: FaStar,
      label: "Poziom",
      value: typeof getUserLevel() === 'number' ? getUserLevel().toLocaleString() : '-',
      gradient: "from-js/20 to-js/30",
    },
    {
      icon: FaCalendarDay,
      label: "Punkty",
      value: typeof getUserPoints() === 'number' ? getUserPoints().toLocaleString() : '-',
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