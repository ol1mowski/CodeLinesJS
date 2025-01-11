import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChallengeCardProps } from '../types';

const difficultyColors = {
  easy: 'text-green-400',
  medium: 'text-yellow-400',
  hard: 'text-red-400'
} as const;

export const ChallengeCard = memo(({ title, description, icon: Icon, difficulty, tags }: ChallengeCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-xl border border-js/20 bg-dark/50 backdrop-blur-sm space-y-4"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-js/10">
        <Icon className="w-6 h-6 text-js" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-js">
          {title}
        </h3>
        <span className={`text-sm ${difficultyColors[difficulty]}`}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
      </div>
    </div>

    <p className="text-gray-400 text-sm leading-relaxed">
      {description}
    </p>

    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs px-2 py-1 rounded-full bg-js/10 text-js"
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
));

ChallengeCard.displayName = 'ChallengeCard'; 