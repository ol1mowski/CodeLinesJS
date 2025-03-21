import { FaCode, FaBrain, FaReact } from 'react-icons/fa';

export const getCategoryIcon = (category: 'basics' | 'advanced' | 'frameworks') => {
  switch (category) {
    case 'basics':
      return FaCode;
    case 'advanced':
      return FaBrain;
    case 'frameworks':
      return FaReact;
  }
};

export const getCategoryLabel = (category: 'basics' | 'advanced' | 'frameworks') => {
  switch (category) {
    case 'basics':
      return 'Podstawy JavaScript';
    case 'advanced':
      return 'Zaawansowany JS';
    case 'frameworks':
      return 'Frameworki JS';
  }
};

export const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-500/20 text-green-400';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'hard':
      return 'bg-red-500/20 text-red-400';
  }
};

export const getDifficultyLabel = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy':
      return 'Łatwy';
    case 'medium':
      return 'Średni';
    case 'hard':
      return 'Trudny';
  }
}; 