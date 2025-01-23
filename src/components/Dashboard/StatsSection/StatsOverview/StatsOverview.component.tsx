import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { LoadingScreen } from "../../../UI/LoadingScreen/LoadingScreen.component";
import { LevelProgress } from "./LevelProgress.component";
import { StatCard } from "./StatCard.component";
import { BadgesGrid } from "./BadgesGrid.component";
import { FaTrophy, FaFire, FaClock, FaStar } from "react-icons/fa";
import { useUserStats } from "../hooks/useUserStats";

type StatsOverviewProps = {
  stats: UserStats;
  isLoading: boolean;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const StatsOverview = memo(({ stats, isLoading }: StatsOverviewProps) => {
  const { data: statsData, error } = useUserStats();

  const formatTime = useMemo(() => (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }, []);

  const statsCards = useMemo(() => {
    if (!statsData) return [];
    
    return [
      {
        icon: FaTrophy,
        label: "Ukończone Wyzwania",
        value: statsData.completedChallenges.toString(),
        gradient: "from-amber-500 to-orange-500"
      },
      {
        icon: FaFire,
        label: "Aktualny Streak",
        value: `${statsData.currentStreak} dni`,
        subValue: `Najlepszy: ${statsData.bestStreak} dni`,
        gradient: "from-red-500 to-pink-500"
      },
      {
        icon: FaStar,
        label: "Średni Wynik",
        value: `${statsData.averageScore}%`,
        gradient: "from-indigo-500 to-purple-500"
      },
      {
        icon: FaClock,
        label: "Czas Nauki",
        value: formatTime(statsData.totalTimeSpent),
        gradient: "from-emerald-500 to-teal-500"
      }
    ];
  }, [statsData, formatTime]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <p className="text-red-500">
          Wystąpił błąd podczas ładowania statystyk: {error.message}
        </p>
      </div>
    );
  }

  if (!statsData) {
    return (
      <div className="p-4 bg-dark/50 rounded-lg">
        <p className="text-gray-400">Brak dostępnych statystyk</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <LevelProgress
        level={statsData.level}
        experience={statsData.experiencePoints}
        nextLevel={statsData.nextLevelThreshold}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statsCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <BadgesGrid badges={statsData.badges} />
    </motion.div>
  );
});

StatsOverview.displayName = "StatsOverview"; 