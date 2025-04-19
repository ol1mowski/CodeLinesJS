import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStats } from './hooks/useStats.hook';
import { StatsOverview } from './StatsOverview/StatsOverview.component';
import { StatsCharts } from './StatsCharts/StatsCharts.component';
import { DashboardState } from '../DashboardContent/components/DashboardState.component';
import { LevelUpNotification } from '../../UI/Notifications/LevelUpNotification.component';
import { LoadingScreen } from '../../UI/LoadingScreen/LoadingScreen.component';
import { Helmet } from 'react-helmet';
import { Badge, LegacyUserStats } from '../../../types/stats.types';

export const StatsSection = memo(() => {
  const { stats, isLoading, error } = useStats();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{
    level: number;
    rewards?: Badge[];
  } | null>(null);

  useEffect(() => {
    if (stats?.progress?.levelUp) {
      setLevelUpData({
        level: stats.progress.level,
        rewards: stats.achievements?.badges || [],
      });
      setShowLevelUp(true);
    }
  }, [stats]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (error) {
    return (
      <DashboardState
        type="error"
        message="Nie udało się załadować statystyk. Spróbuj ponownie później."
      />
    );
  }

  if (!stats) {
    return <DashboardState type="empty" message="Brak dostępnych statystyk." />;
  }

  const adaptedStats: LegacyUserStats = {
    data: {
      progress: {
        level: stats.progress?.level || 0,
        points: stats.progress?.points || 0,
        pointsToNextLevel: stats.progress?.pointsToNextLevel || 0
      },
      achievements: {
        streak: {
          current: stats.achievements?.streak?.current || 0,
          best: stats.achievements?.streak?.best || 0
        },
        completedChallenges: stats.achievements?.completedChallenges || 0,
        badges: stats.achievements?.badges || []
      },
      badges: stats.achievements?.badges || [],
      unlockedFeatures: [],
      levelUp: stats.progress?.levelUp,
      rewards: stats.achievements?.badges ? { 
        badges: stats.achievements.badges,
        bonusPoints: 0,
        unlockedFeatures: []
      } : undefined,
      chartData: {
        daily: stats.stats?.daily || [],
        categories: []
      }
    }
  };

  const chartsData = {
    daily: stats.stats?.daily || []
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full p-6 gap-6"
      >
        <Helmet>
          <title>Statystyki i Postępy | CodeLinesJS</title>
          <meta
            name="description"
            content="Statystyki i Postępy CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku."
          />
        </Helmet>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold font-space text-js">Statystyki i Postępy</h1>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1">
          <div className="flex flex-col gap-6">
            <StatsOverview stats={adaptedStats} isLoading={isLoading} error={error} />
          </div>
          <div className="flex flex-col gap-6 h-full">
            <StatsCharts data={chartsData} isLoading={isLoading} />
          </div>
        </div>
      </motion.div>

      <LevelUpNotification
        isVisible={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        level={levelUpData?.level || 0}
        rewards={{
          badges: levelUpData?.rewards || [],
          bonusPoints: 0,
          unlockedFeatures: []
        }}
      />
    </>
  );
});

StatsSection.displayName = 'StatsSection';
