import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';
import type { RecruitmentStats } from '../hooks/useRecruitment.hook';

type RecruitmentStatsProps = {
  stats: RecruitmentStats;
  variants: any;
};

export const RecruitmentStatsSection = memo(({ stats, variants }: RecruitmentStatsProps) => {
  return (
    <motion.div
      variants={variants}
      className="bg-dark-700/30 border border-js/10 rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <FaUsers className="w-5 h-5 text-js" />
        <h3 className="text-lg font-bold text-white">Przygotuj się z nami!</h3>
      </div>
      <p className="text-gray-300 mb-4">
        Nasze materiały rekrutacyjne zostały przygotowane przez doświadczonych programistów i rekruterów.
        Znajdziesz tu praktyczne porady, które pomogą Ci znaleźć wymarzoną pracę w IT.
      </p>
      <div className="grid sm:grid-cols-3 gap-4 text-center">
        <div className="bg-dark-700/50 border border-js/10 rounded-lg p-3">
          <div className="text-js font-bold text-lg">{stats.technicalQuestions}+</div>
          <div className="text-gray-400 text-sm">Pytań technicznych</div>
        </div>
        <div className="bg-dark-700/50 border border-js/10 rounded-lg p-3">
          <div className="text-js font-bold text-lg">{stats.practicalTasks}+</div>
          <div className="text-gray-400 text-sm">Zadań praktycznych</div>
        </div>
        <div className="bg-dark-700/50 border border-js/10 rounded-lg p-3">
          <div className="text-js font-bold text-lg">{stats.cvTips}+</div>
          <div className="text-gray-400 text-sm">Praktycznych porad jak stworzyć skuteczne CV</div>
        </div>
      </div>
    </motion.div>
  );
});

RecruitmentStatsSection.displayName = 'RecruitmentStatsSection'; 