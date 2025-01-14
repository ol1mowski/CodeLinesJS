import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { UserStats } from "../../../../types/stats.types";
import { LoadingScreen } from "../../../UI/LoadingScreen/LoadingScreen.component";
import { LevelProgress } from "./LevelProgress.component";
import { StatCard } from "./StatCard.component";
import { BadgesGrid } from "./BadgesGrid.component";
import { FaTrophy, FaFire, FaClock, FaStar } from "react-icons/fa";

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
  const formatTime = useMemo(() => (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }, []);

  const statsCards = useMemo(() => [
    {
      icon: FaTrophy,
      label: "Ukończone Wyzwania",
      value: stats.completedChallenges.toString(),
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: FaFire,
      label: "Aktualny Streak",
      value: `${stats.currentStreak} dni`,
      subValue: `Najlepszy: ${stats.bestStreak} dni`,
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: FaStar,
      label: "Średni Wynik",
      value: `${stats.averageScore}%`,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: FaClock,
      label: "Czas Nauki",
      value: formatTime(stats.totalTimeSpent),
      gradient: "from-emerald-500 to-teal-500"
    }
  ], [stats, formatTime]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <LevelProgress
        level={stats.level}
        experience={stats.experiencePoints}
        nextLevel={stats.nextLevelThreshold}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statsCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <BadgesGrid badges={stats.badges} />
    </motion.div>
  );
});

StatsOverview.displayName = "StatsOverview"; 