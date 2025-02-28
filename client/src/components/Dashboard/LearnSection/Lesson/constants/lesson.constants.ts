export const LESSON_DIFFICULTY = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
} as const;

export const DIFFICULTY_STYLES = {
  [LESSON_DIFFICULTY.BEGINNER]: 'bg-green-500/10 text-green-400',
  [LESSON_DIFFICULTY.INTERMEDIATE]: 'bg-yellow-500/10 text-yellow-400',
  [LESSON_DIFFICULTY.ADVANCED]: 'bg-red-500/10 text-red-400'
} as const; 