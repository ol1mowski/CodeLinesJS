import { memo } from 'react';
import { StatsHeader } from './components/StatsHeader.component';
import { StatCard } from './components/StatCard.component';
import { LeaderboardCard } from './components/LeaderboardCard.component';
import { stats, topUsers } from './constants/stats.data';

export const CommunityStats = memo(() => (
  <div className="w-full xl:w-1/2 space-y-8">
    <StatsHeader />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} {...stat} index={index} />
      ))}
    </div>
    <LeaderboardCard users={topUsers} />
  </div>
));

CommunityStats.displayName = 'CommunityStats';
