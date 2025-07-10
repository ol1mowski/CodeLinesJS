import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import { useTechnicalInterview } from './hooks/useTechnicalInterview.hook';
import { TechnicalInterviewHeader } from './TechnicalInterviewHeader.component';
import { InterviewBlockCard } from './InterviewBlockCard.component';
import { InterviewTipsSection } from './InterviewTipsSection.component';
import { TheorySection } from './TheorySection.component';
import PracticeSection from './PracticeSection.component';
import type { TechnicalInterviewView } from '../../types/recruitment.types';

type TechnicalInterviewSectionProps = {
  onBack: () => void;
};

export const TechnicalInterviewSection = memo(({ onBack }: TechnicalInterviewSectionProps) => {
  const [currentView, setCurrentView] = useState<TechnicalInterviewView>('main');
  const { interviewBlocks, interviewTips, containerVariants, itemVariants } = useTechnicalInterview();

  const handleBlockClick = (blockId: string) => {
    if (blockId === 'theory') {
      setCurrentView('theory');
    } else if (blockId === 'practice') {
      setCurrentView('practice');
    }
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };
        
  if (currentView === 'theory') {
    return (
      <TheorySection 
        onBack={handleBackToMain} 
      />
    );
  }

  if (currentView === 'practice') {
    return (
      <PracticeSection 
        onBack={handleBackToMain} 
      />
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <TechnicalInterviewHeader onBack={onBack} />

      <motion.div
        variants={containerVariants}
        className="grid md:grid-cols-2 gap-6"
      >
        {interviewBlocks.map(block => (
          <InterviewBlockCard
            key={block.id}
            block={block}
            variants={itemVariants}
            onClick={() => handleBlockClick(block.id)}
          />
        ))}
      </motion.div>

      <InterviewTipsSection tips={interviewTips} variants={itemVariants} />
    </motion.div>
  );
});

TechnicalInterviewSection.displayName = 'TechnicalInterviewSection'; 