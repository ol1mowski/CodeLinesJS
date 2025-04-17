import { memo } from 'react';
import { FaGraduationCap, FaChartLine, FaClock } from 'react-icons/fa';
import { StatsCard } from './StatsCard.component';
import type { UserStats } from '../../types/learning-paths.types';

interface StatsSectionProps {
  stats: UserStats;
}

export const StatsSection = memo(({ stats }: StatsSectionProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <StatsCard
      icon={FaGraduationCap}
      title="Postęp nauki"
      label="Ukończone ścieżki"
      value={`${stats.completedPaths}/${stats.totalPaths}`}
    />
    <StatsCard
      icon={FaChartLine}
      title="Punkty XP"
      label="Zdobyte punkty"
      value={`${stats.totalPoints} XP`}
    />
    <StatsCard
      icon={FaClock}
      title="W trakcie"
      label="Aktywne ścieżki"
      value={stats.pathsInProgress}
    />
  </div>
));
