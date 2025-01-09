import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import { memo, useMemo } from "react";

import { useGames } from "../../../../hooks/useGames";

import { GameCard } from "./GameCard.component";
import { GamesListSkeleton } from "./GamesListSkeleton.component";
import { NoGamesFound } from "./NoGamesFound.component";
import { ActiveCategory, SortOption } from "../GamesSection.component";
import { GameDifficulty } from "../../../../types/games.types";

type GamesListProps = {
  activeCategory: ActiveCategory;
  sortBy: SortOption;
  searchQuery: string;
  selectedDifficulty: GameDifficulty | "all";
};

export const GamesList = memo(({ 
  activeCategory, 
  sortBy, 
  searchQuery,
  selectedDifficulty 
}: GamesListProps) => {
  const { games, isLoading } = useGames(sortBy, searchQuery, selectedDifficulty);

  const filteredGames = useMemo(() => {
    if (activeCategory === "all") return games;
    return games.filter(game => game.category === activeCategory);
  }, [games, activeCategory]);

  if (isLoading) {
    return <GamesListSkeleton />;
  }

  if (filteredGames.length === 0) {
    return <NoGamesFound searchQuery={searchQuery} activeCategory={activeCategory} />;
  }

  return (
    <LayoutGroup>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.3 },
                layout: { duration: 0.4, type: "spring", bounce: 0.2 },
                scale: { duration: 0.3 }
              }}
              className="flex"
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
});

GamesList.displayName = "GamesList"; 