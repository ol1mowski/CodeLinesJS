import { useMemo } from 'react';
import type { LearningPath } from '../../../../types/learning.types';

export const usePathCardData = (path: LearningPath) => {
  const safeData = useMemo(
    () => ({
      id: path.id,
      title: path.title || 'Brak tytułu',
      description: path.description || 'Brak opisu',
      estimatedTime: path.estimatedTime || 0,
      isLocked: path.isLocked,
      requiredLevel: path.requiredLevel,
      progress: {
        completed: Array.isArray(path.progress?.completed)
          ? path.progress.completed.length
          : Number(path.progress?.completed) || 0,
        total: Number(path.progress?.total) || 0,
        percentage: Number(path.progress?.percentage) || 0,
      },

      outcomes: Array.isArray(path.outcomes) ? path.outcomes.map(outcome => String(outcome)) : [],
      requirements: Array.isArray(path.requirements)
        ? path.requirements.map(req => String(req))
        : [],
    }),
    [path]
  );

  const cardStyles = useMemo(
    () => `
    bg-dark-800/50 border rounded-xl p-6 transition-all
    ${safeData.isLocked ? 'border-gray-700/50 opacity-75' : 'border-js/10 hover:border-js/20'}
  `,
    [safeData.isLocked]
  );

  const hoverAnimation = useMemo(
    () => (!safeData.isLocked ? { scale: 1.02 } : {}),
    [safeData.isLocked]
  );

  return {
    safeData,
    cardStyles,
    hoverAnimation,
  };
};
