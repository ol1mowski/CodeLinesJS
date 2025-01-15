import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { UserStats } from "../../../../types/stats.types";
import { LoadingScreen } from "../../../UI/LoadingScreen/LoadingScreen.component";
import { LevelProgress } from "./LevelProgress.component";
import { StatCard } from "./StatCard.component";
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
      value: stats.completedChallenges.toString()
    },
    {
      icon: FaFire,
      label: "Aktualny Streak",
      value: `${stats.currentStreak} dni`,
      subValue: `Najlepszy: ${stats.bestStreak} dni`
    },
    {
      icon: FaStar,
      label: "Średni Wynik",
      value: `${stats.averageScore}%`
    },
    {
      icon: FaClock,
      label: "Czas Nauki",
      value: formatTime(stats.totalTimeSpent)
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
    </motion.div>
  );
});

StatsOverview.displayName = "StatsOverview"; 