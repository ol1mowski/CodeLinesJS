import { FaCode, FaSync, FaPhoneVolume } from 'react-icons/fa';

export const getCategoryIcon = (category: 'promises' | 'async-await' | 'callbacks') => {
  switch (category) {
    case 'promises':
      return FaCode;
    case 'async-await':
      return FaSync;
    case 'callbacks':
      return FaPhoneVolume;
  }
};

export const getCategoryLabel = (category: 'promises' | 'async-await' | 'callbacks') => {
  switch (category) {
    case 'promises':
      return 'Promises';
    case 'async-await':
      return 'Async/Await';
    case 'callbacks':
      return 'Callbacks';
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