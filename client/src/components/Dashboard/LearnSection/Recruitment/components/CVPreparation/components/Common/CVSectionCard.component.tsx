import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';
import type { CVPreparationSection } from '../../types/cv.types';
import type { AnimationVariants } from '../../../../types/recruitment.types';

interface CVSectionCardProps {
  section: CVPreparationSection;
  variants: AnimationVariants;
  onClick?: () => void;
}

export const CVSectionCard: React.FC<CVSectionCardProps> = memo(({
  section,
  variants,
  onClick
}) => {
  const { title, description, icon: Icon, stats, isAvailable } = section;

  return (
    <motion.div
      variants={variants}
      whileHover={isAvailable ? { scale: 1.02 } : {}}
      onClick={isAvailable ? onClick : undefined}
      className={`
        relative bg-dark-700/50 border border-js/10 rounded-xl p-6 transition-all
        ${isAvailable 
          ? 'hover:border-js/20 cursor-pointer group' 
          : 'opacity-60 cursor-not-allowed'
        }
      `}
    >
      {!isAvailable && (
        <div className="absolute top-4 right-4">
          <div className="p-2 bg-dark rounded-full border border-gray-600">
            <FaLock className="w-3 h-3 text-gray-400" />
          </div>
        </div>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className={`
          p-3 rounded-lg border transition-colors
          ${isAvailable 
            ? 'bg-js/10 border-js/20 group-hover:bg-js/20' 
            : 'bg-gray-700/30 border-gray-600'
          }
        `}>
          <Icon className={`w-6 h-6 ${isAvailable ? 'text-js' : 'text-gray-400'}`} />
        </div>
        
        <div className="flex-1">
          <h3 className={`
            text-xl font-bold mb-2 transition-colors
            ${isAvailable 
              ? 'text-white group-hover:text-js' 
              : 'text-gray-400'
            }
          `}>
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>Dostępne: {stats.items}</span>
          {stats.completed !== undefined && (
            <span>Ukończone: {stats.completed}</span>
          )}
        </div>

        {!isAvailable && (
          <span className="text-xs bg-gray-700/50 text-gray-400 border border-gray-600 px-2 py-1 rounded">
            Wkrótce
          </span>
        )}

        {isAvailable && (
          <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded">
            Dostępne
          </span>
        )}
      </div>

      {stats.completed !== undefined && stats.completed > 0 && (
        <div className="mt-4">
          <div className="w-full h-2 bg-dark rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-js to-js/80"
              initial={{ width: 0 }}
              animate={{ width: `${(stats.completed / stats.items) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{stats.completed} z {stats.items}</span>
            <span>{Math.round((stats.completed / stats.items) * 100)}%</span>
          </div>
        </div>
      )}
    </motion.div>
  );
});

CVSectionCard.displayName = 'CVSectionCard'; 