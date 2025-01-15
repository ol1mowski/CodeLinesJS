import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStats } from "../../../Hooks/useStats";
import { StatsOverview } from "./StatsOverview/StatsOverview.component";
import { StatsCharts } from "./StatsCharts/StatsCharts.component";
import { DashboardState } from "../DashboardContent/components/DashboardState.component";
import { LevelUpNotification } from "../../UI/Notifications/LevelUpNotification.component";

export const StatsSection = memo(() => {
  const { stats, isLoading, error } = useStats();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{
    level: number;
    rewards?: any;
  } | null>(null);

  useEffect(() => {
    if (stats?.levelUp) {
      setLevelUpData({
        level: stats.level,
        rewards: stats.rewards
      });
      setShowLevelUp(true);
    }
  }, [stats]);

  if (isLoading) {
    return <DashboardState type="loading" />;
  }

  if (error) {
    return <DashboardState 
      type="error" 
      message="Nie udało się załadować statystyk. Spróbuj ponownie później." 
    />;
  }

  if (!stats) {
    return <DashboardState 
      type="empty" 
      message="Brak dostępnych statystyk." 
    />;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 p-6"
      >
        <div className="flex items-center justify-between mb-8">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-3xl font-bold font-space text-js"
          >
            Statystyki i Postępy
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatsOverview stats={stats} isLoading={isLoading} />
          <StatsCharts data={stats.chartData} isLoading={isLoading} />
        </div>
      </motion.div>

      <LevelUpNotification
        isVisible={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        level={levelUpData?.level || 0}
        rewards={levelUpData?.rewards}
      />
    </>
  );
});

StatsSection.displayName = "StatsSection"; 