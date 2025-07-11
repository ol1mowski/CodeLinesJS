import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface TestActionsProps {
  onNext: () => void | Promise<void>;
  selectedAnswer: number | null;
  isLastQuestion: boolean;
}

export const TestActions: React.FC<TestActionsProps> = memo(({
  onNext,
  selectedAnswer,
  isLastQuestion
}) => {
  const canProceed = selectedAnswer !== null;

  const handleNext = async () => {
    if (canProceed) {
      await onNext();
    }
  };

  return (
    <div className="flex justify-end">
      <motion.button
        onClick={handleNext}
        disabled={!canProceed}
        className={`px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 ${
          canProceed
            ? 'bg-gradient-to-r from-js to-js/80 text-dark hover:shadow-lg hover:shadow-js/20'
            : 'bg-dark-700 text-gray-500 cursor-not-allowed'
        }`}
        whileHover={canProceed ? { scale: 1.05 } : {}}
        whileTap={canProceed ? { scale: 0.95 } : {}}
      >
        {isLastQuestion ? 'Zakończ test' : 'Następne pytanie'}
      </motion.button>
    </div>
  );
});

TestActions.displayName = 'TestActions'; 