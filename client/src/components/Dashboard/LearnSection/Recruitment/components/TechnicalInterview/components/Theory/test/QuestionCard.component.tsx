import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { ITheoryQuestion } from '../../../api/theoryQuestions.api';

interface QuestionCardProps {
  question: ITheoryQuestion;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  currentQuestionIndex: number;
  getOptionLetter: (index: number) => string;
}

export const QuestionCard: React.FC<QuestionCardProps> = memo(({
  question,
  selectedAnswer,
  onAnswerSelect,
  currentQuestionIndex,
  getOptionLetter
}) => {
  return (
    <motion.div
      key={currentQuestionIndex}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8"
    >
      <div className="mb-4 md:mb-6">
        <div className="text-js text-xs sm:text-sm font-medium mb-2 uppercase tracking-wide">
          {question.category}
        </div>
        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3 md:space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full p-3 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              selectedAnswer === index
                ? 'border-js bg-js/10 text-white'
                : 'border-js/10 bg-dark-700/50 text-gray-300 hover:border-js/20 hover:bg-dark-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedAnswer === index
                    ? 'border-js bg-js'
                    : 'border-gray-600'
                }`}>
                  {selectedAnswer === index && (
                    <FaCheck className="text-dark text-xs" />
                  )}
                </div>
                <span className="text-sm sm:text-lg truncate">{option}</span>
              </div>
              <div className="text-gray-500 text-xs sm:text-sm font-medium flex-shrink-0 ml-2">
                {getOptionLetter(index)}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
});

QuestionCard.displayName = 'QuestionCard'; 