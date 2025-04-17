import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

type AnswerOptionProps = {
  option: string;
  index: number;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  correctAnswer: number;
  onSelect: (index: number) => void;
};

export const AnswerOption = memo(
  ({ option, index, selectedAnswer, isCorrect, correctAnswer, onSelect }: AnswerOptionProps) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={selectedAnswer !== null}
      onClick={() => onSelect(index)}
      className={`
      p-4 rounded-lg text-left transition-all
      ${
        selectedAnswer === null
          ? 'bg-dark/50 hover:bg-dark/70 text-js border border-js/10'
          : selectedAnswer === index
            ? isCorrect
              ? 'bg-green-500/20 border-2 border-green-500/50'
              : 'bg-red-500/20 border-2 border-red-500/50'
            : index === correctAnswer && !isCorrect
              ? 'bg-green-500/20 border-2 border-green-500/50'
              : 'bg-dark/50 opacity-50 border border-js/10'
      }
    `}
    >
      <div className="flex items-center justify-between">
        <span>{option}</span>
        {selectedAnswer === index && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {isCorrect ? (
              <FaCheck className="text-green-500" />
            ) : (
              <FaTimes className="text-red-500" />
            )}
          </motion.span>
        )}
      </div>
    </motion.button>
  )
);

AnswerOption.displayName = 'AnswerOption';
