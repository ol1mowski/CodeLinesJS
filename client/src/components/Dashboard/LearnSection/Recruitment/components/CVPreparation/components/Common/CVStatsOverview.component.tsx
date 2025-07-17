import React, { memo } from 'react';
import { motion } from 'framer-motion';
import type { CVStats } from '../../types/cv.types';
import type { AnimationVariants } from '../../../../types/recruitment.types';

interface CVStatsOverviewProps {
  stats: CVStats;
  variants: AnimationVariants;
}

export const CVStatsOverview: React.FC<CVStatsOverviewProps> = memo(({ stats, variants }) => (
  <motion.div
    variants={variants}
    className="bg-dark-700/30 border border-js/10 rounded-xl p-6"
  >
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div>
        <div className="text-2xl font-bold text-js">{stats.totalTips}</div>
        <div className="text-sm text-gray-400">Dostępnych porad</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-js">{stats.totalExamples}</div>
        <div className="text-sm text-gray-400">Gotowych przykładów</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-js">
          {stats.userProgress?.completionPercentage || 0}%
        </div>
        <div className="text-sm text-gray-400">Ukończono</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-js">
          {stats.userProgress?.tipsViewed || 0}
        </div>
        <div className="text-sm text-gray-400">Przeczytanych porad</div>
      </div>
    </div>
  </motion.div>
));

CVStatsOverview.displayName = 'CVStatsOverview'; 