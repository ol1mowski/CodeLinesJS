import React from 'react';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { GamesHeader } from './GamesHeader/GamesHeader.component';
import { GamesList } from './GamesList/GamesList.component';
import { GamesSorting } from './GamesSorting/GamesSorting.component';
import { GamesSearch } from './GamesSearch/GamesSearch.component';
import { GamesDifficulty } from './GamesDifficulty/GamesDifficulty.component';
import { useGameFilters } from '../../../hooks/useGameFilters';

export const GamesSection = memo(() => {
  const { filters, setters } = useGameFilters();
  const { sortBy, searchQuery, selectedDifficulty } = filters;
  const { setSortBy, setSearchQuery, setSelectedDifficulty } = setters;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full m-0 min-h-screen bg-dark/50 backdrop-blur-sm"
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GamesHeader />

        <div className="mt-8 bg-dark-800/50 border border-js/10 rounded-xl p-4 sm:p-6">
          <GamesFilters 
            sortBy={sortBy}
            searchQuery={searchQuery}
            selectedDifficulty={selectedDifficulty}
            setSortBy={setSortBy}
            setSearchQuery={setSearchQuery}
            setSelectedDifficulty={setSelectedDifficulty}
          />

          <div className="mt-6">
            <GamesList
              sortBy={sortBy}
              searchQuery={searchQuery}
              selectedDifficulty={selectedDifficulty}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

GamesSection.displayName = "GamesSection";