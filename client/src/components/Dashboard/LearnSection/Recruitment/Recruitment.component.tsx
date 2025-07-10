import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import { useRecruitment } from './hooks/useRecruitment.hook';
import { RecruitmentHeader } from './components/RecruitmentHeader.component';
import { RecruitmentCard } from './components/RecruitmentCard.component';
import { RecruitmentStatsSection } from './components/RecruitmentStats.component';
import { TechnicalInterviewSection } from './components/TechnicalInterview/TechnicalInterviewSection.component';
import type { ViewMode } from './types/recruitment.types';

export const Recruitment = memo(() => {
  const [currentView, setCurrentView] = useState<ViewMode>('main');
  const { recruitmentSections, stats, containerVariants, itemVariants } = useRecruitment();

  const handleCardClick = (sectionId: string) => {
    if (sectionId === 'technical-interview') {
      setCurrentView('technical-interview');
    } else if (sectionId === 'cv-preparation') {
      setCurrentView('cv-preparation');
    }
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  if (currentView === 'technical-interview') {
    return <TechnicalInterviewSection onBack={handleBackToMain} />;
  }

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
            onClick={() => handleCardClick(section.id)}
          />
        ))}
      </motion.div>

      <RecruitmentStatsSection stats={stats} variants={itemVariants} />
    </motion.div>
  );
});

Recruitment.displayName = 'Recruitment'; 