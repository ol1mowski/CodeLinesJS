import { FaCode, FaCube, FaArrowUp } from 'react-icons/fa';

export const getCategoryIcon = (category: 'scope' | 'closure' | 'hoisting') => {
  switch (category) {
    case 'scope':
      return FaCode;
    case 'closure':
      return FaCube;
    case 'hoisting':
      return FaArrowUp;
  }
};

export const getCategoryLabel = (category: 'scope' | 'closure' | 'hoisting') => {
  switch (category) {
    case 'scope':
      return 'Zakres zmiennych';
    case 'closure':
      return 'Domknięcia';
    case 'hoisting':
      return 'Hoisting';
  }
};

export const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-400 bg-green-500/10';
    case 'medium':
      return 'text-yellow-400 bg-yellow-500/10';
    case 'hard':
      return 'text-red-400 bg-red-500/10';
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