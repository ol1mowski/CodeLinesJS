import { motion } from 'framer-motion';
import { memo } from 'react';
import { FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { Resource } from '../../../../types/learning.types';

type ResourceCardProps = {
  resource: Resource;
  isRecommended?: boolean;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

export const ResourceCard = memo(({ resource, isRecommended }: ResourceCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      className="group relative bg-dark-800/50 border border-js/10 rounded-xl p-5 hover:border-js/20 transition-colors"
    >
      {isRecommended && (
        <div className="absolute -top-2 -right-2 bg-js text-dark px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
          <FaStar className="w-3 h-3" />
          Polecane
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-bold text-js mb-1 line-clamp-1">{resource.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{resource.description}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-medium
            ${
              resource.type === 'documentation'
                ? 'bg-blue-500/10 text-blue-400'
                : resource.type === 'tutorial'
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-purple-500/10 text-purple-400'
            }`}
          >
            {resource.type === 'documentation'
              ? 'Dokumentacja'
              : resource.type === 'tutorial'
                ? 'Tutorial'
                : 'Artykuł'}
          </span>

          <span
            className={`px-2 py-0.5 rounded-md text-xs font-medium
            ${
              resource.difficulty === 'beginner'
                ? 'bg-green-500/10 text-green-400'
                : resource.difficulty === 'intermediate'
                  ? 'bg-yellow-500/10 text-yellow-400'
                  : 'bg-red-500/10 text-red-400'
            }`}
          >
            {resource.difficulty === 'beginner'
              ? 'Podstawowy'
              : resource.difficulty === 'intermediate'
                ? 'Średni'
                : 'Zaawansowany'}
          </span>
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-js hover:text-js/80 transition-colors text-sm"
        >
          Otwórz materiał
          <FaExternalLinkAlt className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
});

ResourceCard.displayName = 'ResourceCard';
