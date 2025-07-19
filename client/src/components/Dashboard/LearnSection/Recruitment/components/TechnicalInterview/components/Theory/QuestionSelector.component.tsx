import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle } from 'react-icons/fa';

type QuestionSelectorProps = {
  options: { value: number; label: string; time: string }[];
  selectedCount: number;
  onSelectionChange: (count: number) => void;
};

export const QuestionSelector = memo(({ options, selectedCount, onSelectionChange }: QuestionSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2 text-js">
        <FaQuestionCircle className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Wybierz ilość pytań</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectionChange(option.value)}
            className={`p-4 rounded-xl border transition-all ${
              selectedCount === option.value
                ? 'bg-js/10 border-js text-js'
                : 'bg-dark-700/30 border-gray-600 text-gray-300 hover:border-js/50'
            }`}
          >
            <div className="text-center">
              <div className="text-lg font-bold">{option.label}</div>

            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
});

QuestionSelector.displayName = 'QuestionSelector'; 