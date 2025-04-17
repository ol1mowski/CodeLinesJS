import { memo } from 'react';
import { StatsHeader } from './components/StatsHeader.component';
import { StatCard } from './components/StatCard.component';
import { stats } from './constants/stats.data';

export const ProgressStats = memo(() => (
  <div className="w-full xl:w-1/2 space-y-6">
    <StatsHeader />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} {...stat} index={index} />
      ))}
    </div>
  </div>
));

ProgressStats.displayName = 'ProgressStats';
