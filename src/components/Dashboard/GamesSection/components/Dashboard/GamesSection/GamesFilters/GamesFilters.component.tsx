import React from 'react';
import { GamesSorting } from '../GamesSorting/GamesSorting.component';
import { GamesSearch } from '../GamesSearch/GamesSearch.component';
import { GamesDifficulty } from '../GamesDifficulty/GamesDifficulty.component';
import { GameDifficulty } from '../../../../types/games.types';
import { SortOption } from '../../../../types/games.types';

interface GamesFiltersProps {
  sortBy: SortOption;
  searchQuery: string;
  selectedDifficulty: GameDifficulty | 'all';
  setSortBy: (option: SortOption) => void;
  setSearchQuery: (query: string) => void;
  setSelectedDifficulty: (difficulty: GameDifficulty | 'all') => void;
}

export const GamesFilters: React.FC<GamesFiltersProps> = ({
  sortBy,
  searchQuery,
  selectedDifficulty,
  setSortBy,
  setSearchQuery,
  setSelectedDifficulty
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-72">
          <GamesSearch 
            value={searchQuery} 
            onChange={setSearchQuery} 
          />
        </div>
        <GamesSorting 
          activeSortOption={sortBy} 
          onSortChange={setSortBy} 
        />
      </div>

      <div className="mt-4">
        <GamesDifficulty 
          selectedDifficulty={selectedDifficulty} 
          onDifficultyChange={setSelectedDifficulty} 
        />
      </div>
    </div>
  );
};
