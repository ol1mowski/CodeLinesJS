import React from 'react';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { GamesListSkeleton } from './GamesListSkeleton.component';
import { NoGamesFound } from './NoGamesFound.component';
import { GameCard } from './GameCard.component';
import { SortOption } from '../../../../types/games.types';
import { GameDifficulty } from '../../../../types/games.types';
import { useGamesQuery, useFilteredGames } from '../../../../hooks/useGames';

type GamesListProps = {
  sortBy: SortOption;
  searchQuery: string;
  selectedDifficulty: GameDifficulty | 'all';
};

export const GamesList = memo(({ sortBy, searchQuery, selectedDifficulty }: GamesListProps) => {
  const { data, isLoading, isError } = useGamesQuery();
  const filteredGames = useFilteredGames(data?.games, sortBy, searchQuery, selectedDifficulty);

  if (isLoading) return <GamesListSkeleton />;
  
  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Wystąpił błąd podczas ładowania gier. Spróbuj ponownie później.</p>
      </div>
    );
  }

  if (!filteredGames.length) {
    return <NoGamesFound query={searchQuery} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
    >
      {filteredGames.map((game) => (
        <GameCard key={game._id} game={game} className="w-full" />
      ))}
    </motion.div>
  );
});

GamesList.displayName = "GamesList"; 