import { memo } from "react";
import { motion } from "framer-motion";
import { LoadingScreen } from "../../../UI/LoadingScreen/LoadingScreen.component";
import { LevelProgress } from "./LevelProgress.component";
import { StatCard } from "./StatCard.component";
import { BadgesGrid } from "./BadgesGrid/BadgesGrid.component";
import { ErrorState } from "./components/ErrorState.component";
import { useStatsCards } from "./hooks/useStatsCards";
import { UserStats } from "../../../../types/stats.types";
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
  const statsCards = useStatsCards(statsData || stats);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorState message={`Wystąpił błąd podczas ładowania statystyk: ${error.message}`} />;
  }

  const displayData = stats.data;

  if (!displayData) {
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
        level={displayData.level}
        experience={displayData.xp}
        nextLevel={displayData.pointsToNextLevel}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statsCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <BadgesGrid badges={displayData.badges} />
    </motion.div>
  );
});

StatsOverview.displayName = "StatsOverview"; 