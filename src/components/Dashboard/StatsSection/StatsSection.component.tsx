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
        className="flex flex-col h-full p-6 gap-6"
      >
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold font-space text-js">
            Statystyki i Postępy
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1">
          <div className="flex flex-col gap-6">
            <StatsOverview 
              stats={stats} 
              isLoading={isLoading} 
            />
          </div>
          <div className="flex flex-col gap-6 h-full">
            <StatsCharts 
              data={stats?.chartData} 
              isLoading={isLoading} 
            />
          </div>
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