const difficultyMap = {
  easy: 'Łatwy',
  medium: 'Średni',
  hard: 'Trudny'
} as const;

export const difficultyColors = {
  "Łatwy": "from-green-500/20 to-emerald-500/20 group-hover:from-green-500/30 group-hover:to-emerald-500/30 text-emerald-400",
  "Średni": "from-yellow-500/20 to-orange-500/20 group-hover:from-yellow-500/30 group-hover:to-orange-500/30 text-orange-400",
  "Trudny": "from-red-500/20 to-rose-500/20 group-hover:from-red-500/30 group-hover:to-rose-500/30 text-rose-400",
};

export const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => 
  difficultyColors[difficultyMap[difficulty]];
  