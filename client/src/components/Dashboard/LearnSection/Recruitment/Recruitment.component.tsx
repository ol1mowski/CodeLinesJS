import { motion } from 'framer-motion';
import { memo } from 'react';
import { useRecruitment } from './hooks/useRecruitment.hook';
import { RecruitmentHeader } from './components/RecruitmentHeader.component';
import { RecruitmentCard } from './components/RecruitmentCard.component';
import { RecruitmentStatsSection } from './components/RecruitmentStats.component';

export const Recruitment = memo(() => {
  const { recruitmentSections, stats, containerVariants, itemVariants } = useRecruitment();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <RecruitmentHeader />

      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-2 gap-6"
      >
        {recruitmentSections.map(section => (
          <RecruitmentCard
            key={section.id}
            section={section}
            variants={itemVariants}
          />
        ))}
      </motion.div>

      <RecruitmentStatsSection stats={stats} variants={itemVariants} />
    </motion.div>
  );
});

Recruitment.displayName = 'Recruitment'; 