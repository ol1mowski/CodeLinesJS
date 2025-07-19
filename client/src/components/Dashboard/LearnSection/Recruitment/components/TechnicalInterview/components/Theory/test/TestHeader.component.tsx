import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

interface TestHeaderProps {
  onBack: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
}

export const TestHeader: React.FC<TestHeaderProps> = memo(({
  onBack,
  currentQuestionIndex,
  totalQuestions,
  progress
}) => {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
        >
          <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          Powrót
        </button>
        <div className="text-white text-sm sm:text-lg font-medium">
          Pytanie {currentQuestionIndex + 1} z {totalQuestions}
        </div>
      </div>
      
      <div className="w-full h-2 bg-dark rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-js to-js/80"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
});

TestHeader.displayName = 'TestHeader'; 