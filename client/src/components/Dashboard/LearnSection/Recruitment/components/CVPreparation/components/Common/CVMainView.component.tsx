import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { CVHeader } from './CVHeader.component';
import { CVSectionCard } from './CVSectionCard.component';
import { CVStatsOverview } from './CVStatsOverview.component';
import { CVInfoSection } from './CVInfoSection.component';
import type { CVStats, CVPreparationSection } from '../../types/cv.types';
import type { AnimationVariants } from '../../../../types/recruitment.types';

interface CVMainViewProps {
  stats: CVStats | null;
  loading: boolean;
  cvPreparationSections: CVPreparationSection[];
  containerVariants: AnimationVariants;
  itemVariants: AnimationVariants;
  onBack: () => void;
  onSectionClick: (sectionId: string) => void;
}

export const CVMainView: React.FC<CVMainViewProps> = memo(({
  stats,
  loading,
  cvPreparationSections,
  containerVariants,
  itemVariants,
  onBack,
  onSectionClick
}) => (
  <div className="min-h-screen bg-dark/50 backdrop-blur-sm p-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <CVHeader
          title="Przygotowanie CV"
          description="Stwórz profesjonalne CV, które przyciągnie uwagę rekruterów i wyróżni Cię na rynku pracy"
          onBack={onBack}
        />

        {loading && !stats && (
          <div className="flex justify-center py-12">
            <FaSpinner className="w-8 h-8 text-js animate-spin" />
          </div>
        )}

        {stats && (
          <CVStatsOverview stats={stats} variants={itemVariants} />
        )}

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-6"
        >
          {cvPreparationSections.map(section => (
            <CVSectionCard
              key={section.id}
              section={section}
              variants={itemVariants}
              onClick={() => onSectionClick(section.id)}
            />
          ))}
        </motion.div>

        <CVInfoSection variants={itemVariants} />
      </motion.div>
    </div>
  </div>
));

CVMainView.displayName = 'CVMainView'; 