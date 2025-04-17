import { useState } from 'react';
import { GameDifficulty, SortOption } from '../types/games.types';

export const useGameFilters = () => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty | 'all'>('all');

  return {
    filters: {
      sortBy,
      searchQuery,
      selectedDifficulty,
    },
    setters: {
      setSortBy,
      setSearchQuery,
      setSelectedDifficulty,
    },
  };
};
