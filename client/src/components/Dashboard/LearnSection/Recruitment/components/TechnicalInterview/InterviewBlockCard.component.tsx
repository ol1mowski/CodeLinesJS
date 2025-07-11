import { memo } from 'react';
import { motion } from 'framer-motion';
import type { InterviewBlock, AnimationVariants } from '../../types/recruitment.types';

type InterviewBlockCardProps = {
  block: InterviewBlock;
  variants: AnimationVariants;
  onClick?: () => void;
};

export const InterviewBlockCard = memo(({ block, variants, onClick }: InterviewBlockCardProps) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="bg-dark-700/50 border border-js/10 rounded-xl p-6 hover:border-js/20 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-js/10 border border-js/20">
          <block.icon className="w-6 h-6 text-js" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-js transition-colors">
            {block.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {block.description}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Tematy do nauki:</h4>
        <ul className="space-y-2">
          {block.topics.map((topic, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-1.5 h-1.5 bg-js rounded-full" />
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Dostępność:</span>
          <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded">
            Dostępne
          </span>
        </div>
      </div>
    </motion.div>
  );
});

InterviewBlockCard.displayName = 'InterviewBlockCard'; 