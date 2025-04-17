import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useMobileDetect } from '../../../../hooks/useMobileDetect';

type QuizAnswerProps = {
  answer: string;
  isSelected: boolean;
  isCorrect: boolean | null;
  onClick: () => void;
  disabled: boolean;
};

export const QuizAnswer = memo(
  ({ answer, isSelected, isCorrect, onClick, disabled }: QuizAnswerProps) => {
    const isMobile = useMobileDetect();

    const buttonClassName = `
    relative w-full p-4 rounded-lg border-2 transition-all
    ${
      isSelected
        ? isCorrect
          ? 'border-green-500 bg-green-500/10'
          : 'border-red-500 bg-red-500/10'
        : 'border-js/20 hover:border-js/40 bg-dark/50'
    }
    ${disabled && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

    const renderIcon = () => {
      if (isSelected && isCorrect !== null) {
        return (
          <span className="ml-2">
            {isCorrect ? (
              <FaCheck className="text-green-500" />
            ) : (
              <FaTimes className="text-red-500" />
            )}
          </span>
        );
      }
      return null;
    };

    if (isMobile) {
      return (
        <button onClick={onClick} disabled={disabled} className={buttonClassName}>
          <div className="flex items-center justify-between">
            <span className="text-gray-200">{answer}</span>
            {renderIcon()}
          </div>
        </button>
      );
    }

    return (
      <motion.button
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onClick={onClick}
        disabled={disabled}
        className={buttonClassName}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-200">{answer}</span>
          {isSelected && isCorrect !== null && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-2">
              {isCorrect ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaTimes className="text-red-500" />
              )}
            </motion.span>
          )}
        </div>
      </motion.button>
    );
  }
);

QuizAnswer.displayName = 'QuizAnswer';
