import { memo } from 'react';
import { DIFFICULTY_STYLES } from '../constants/lesson.constants';


type DifficultyBadgeProps = {
  difficulty: string;
};

export const DifficultyBadge = memo(({ difficulty }: DifficultyBadgeProps) => (
  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${DIFFICULTY_STYLES[difficulty as keyof typeof DIFFICULTY_STYLES]}`}>
    {difficulty === 'beginner' ? 'Podstawowy' :
     difficulty === 'intermediate' ? 'Średni' : 'Zaawansowany'}
  </span>
));

DifficultyBadge.displayName = "DifficultyBadge"; 