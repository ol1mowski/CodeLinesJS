import { memo } from 'react';
import { FaClock, FaStar, FaHeart } from 'react-icons/fa';
import { GameplayStats as Stats } from '../../../types/gameplay.types';

type GameplayStatsProps = {
  stats: Stats;
};

export const GameplayStats = memo(({ stats }: GameplayStatsProps) => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-dark-800/50 border border-js/10">
        <div className="flex items-center gap-2 text-js mb-2">
          <FaClock className="w-4 h-4" />
          <span className="font-mono">{stats.timeElapsed}s</span>
        </div>

        <div className="flex items-center gap-2 text-js mb-2">
          <FaStar className="w-4 h-4" />
          <span className="font-mono">{stats.score} pkt</span>
        </div>

        <div className="flex items-center gap-2 text-js">
          <FaHeart className="w-4 h-4" />
          <span className="font-mono">x{stats.lives}</span>
        </div>
      </div>
    </div>
  );
});
