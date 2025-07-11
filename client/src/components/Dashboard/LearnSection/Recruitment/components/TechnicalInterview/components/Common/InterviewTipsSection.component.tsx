import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode } from 'react-icons/fa';
import type { InterviewTip, AnimationVariants } from '../../types/recruitment.types';

type InterviewTipsSectionProps = {
  tips: InterviewTip[];
  variants: AnimationVariants;
};

export const InterviewTipsSection = memo(({ tips, variants }: InterviewTipsSectionProps) => {
  return (
    <motion.div
      variants={variants}
      className="bg-dark-700/30 border border-js/10 rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <FaLaptopCode className="w-5 h-5 text-js" />
        <h3 className="text-lg font-bold text-white">Porady na rozmowę techniczną</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {tips.map((tipGroup, index) => (
          <div key={index} className="space-y-2">
            <h4 className="font-semibold text-js text-sm">{tipGroup.category}</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              {tipGroup.tips.map((tip, tipIndex) => (
                <li key={tipIndex}>• {tip}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

InterviewTipsSection.displayName = 'InterviewTipsSection'; 