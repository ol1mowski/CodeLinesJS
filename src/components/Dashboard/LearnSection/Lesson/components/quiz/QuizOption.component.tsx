import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const getOptionClassName = (isSelected: boolean, isCorrect: boolean, showExplanation: boolean) => {
  if (showExplanation) {
    if (isCorrect) return 'bg-green-500/10 text-green-400 border border-green-500/20';
    if (isSelected) return 'bg-red-500/10 text-red-400 border border-red-500/20';
    return 'bg-dark-800/50 text-gray-400';
  }
  return isSelected 
    ? 'bg-js/10 text-js border border-js/20'
    : 'bg-dark-800/50 text-gray-400 hover:bg-js/5 hover:text-js/80';
};

type QuizOptionProps = {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  showExplanation: boolean;
  onSelect: (index: number) => void;
};

export const QuizOption = memo(({ 
  option, 
  index, 
  isSelected, 
  isCorrect, 
  showExplanation, 
  onSelect 
}: QuizOptionProps) => (
  <motion.button
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    disabled={showExplanation}
    onClick={() => onSelect(index)}
    className={getOptionClassName(isSelected, isCorrect, showExplanation)}
  >
    {option}
    {showExplanation && isCorrect && <FaCheck className="inline ml-2 w-4 h-4" />}
    {showExplanation && isSelected && !isCorrect && <FaTimes className="inline ml-2 w-4 h-4" />}
  </motion.button>
)); 