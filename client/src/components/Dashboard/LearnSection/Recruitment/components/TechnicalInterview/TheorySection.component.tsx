import { memo } from 'react';
import { motion } from 'framer-motion';
import { useTheorySection } from './hooks/useTheorySection.hook';
import { BackButton } from './components/BackButton.component';
import { TheoryHeader } from './components/TheoryHeader.component';
import { QuestionSelector } from './components/QuestionSelector.component';
import { TestInfoSection } from './components/TestInfoSection.component';
import { StartButton } from './components/StartButton.component';

type TheorySectionProps = {
  onBack: () => void;
  onStart: (questionCount: number) => void;
};

export const TheorySection = memo(({ onBack, onStart }: TheorySectionProps) => {
  const {
    selectedCount,
    questionOptions,
    testInfo,
    cardVariants,
    handleQuestionCountChange,
  } = useTheorySection();

  const handleStart = () => {
    onStart(selectedCount);
  };

  return (
    <div className="min-h-screen bg-dark/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl w-full space-y-8"
      >
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} />
        </div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-dark-700/50 border border-js/10 rounded-2xl p-8 text-center space-y-8"
        >
          <TheoryHeader />

          <QuestionSelector
            options={questionOptions}
            selectedCount={selectedCount}
            onSelectionChange={handleQuestionCountChange}
          />

          <TestInfoSection details={testInfo.details} />

          <StartButton questionCount={selectedCount} onStart={handleStart} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-gray-400 text-sm"
        >
          Tematy: {testInfo.topics}
        </motion.div>
      </motion.div>
    </div>
  );
});

TheorySection.displayName = 'TheorySection'; 