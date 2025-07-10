import { motion } from 'framer-motion';
import { memo } from 'react';
import { useTechnicalInterview } from './hooks/useTechnicalInterview.hook';
import { TechnicalInterviewHeader } from './TechnicalInterviewHeader.component';
import { InterviewBlockCard } from './InterviewBlockCard.component';
import { InterviewTipsSection } from './InterviewTipsSection.component';

type TechnicalInterviewSectionProps = {
  onBack: () => void;
};

export const TechnicalInterviewSection = memo(({ onBack }: TechnicalInterviewSectionProps) => {
  const { interviewBlocks, interviewTips, containerVariants, itemVariants } = useTechnicalInterview();

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
          />
        ))}
      </motion.div>

      <InterviewTipsSection tips={interviewTips} variants={itemVariants} />
    </motion.div>
  );
});

TechnicalInterviewSection.displayName = 'TechnicalInterviewSection'; 