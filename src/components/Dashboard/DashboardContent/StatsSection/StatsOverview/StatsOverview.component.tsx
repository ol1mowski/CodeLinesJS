import { memo } from "react";
import { motion } from "framer-motion";
import { UserStats } from "../../../../../types/stats.types";
import { LoadingScreen } from "../../../../UI/LoadingScreen/LoadingScreen.component";

import { useTimeFormat } from "./hooks/useTimeFormat";
import { useStatsCards } from "./hooks/useStatsCards";
import { statsOverviewStyles as styles } from "./style/StatsOverview.styles";
import { LevelProgress } from "../../../StatsSection/StatsOverview/LevelProgress.component";
import { StatCard } from "./StatCard.component";

type StatsOverviewProps = {
  stats: UserStats | null | undefined;
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
  const formatTime = useTimeFormat();
  
  if (isLoading) return <LoadingScreen />;
  if (!stats) return null;

  const statsCards = useStatsCards(stats, formatTime);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={styles.container}
    >
      <LevelProgress
        level={stats.level}
        experience={stats.experiencePoints}
        nextLevel={stats.nextLevelThreshold}
      />

      <div className={styles.grid}>
        {statsCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>
    </motion.div>
  );
});

StatsOverview.displayName = "StatsOverview"; 