import { motion } from "framer-motion";
import { memo } from "react";
import { useGames } from "../../../../hooks/useGames";
import { GamesListSkeleton } from "./GamesListSkeleton.component";
import { NoGamesFound } from "./NoGamesFound.component";
import { GameCard } from "./GameCard.component";

type GamesListProps = {
  activeCategory: string;
  sortBy: string;
  searchQuery: string;
  selectedDifficulty: string;
};

export const GamesList = memo(({ activeCategory, sortBy, searchQuery, selectedDifficulty }: GamesListProps) => {
  const { games, isLoading } = useGames();

  if (isLoading) return <GamesListSkeleton />;

  const filteredGames = games
    .filter(game => 
      (activeCategory === "all" || game.category === activeCategory) &&
      (selectedDifficulty === "all" || game.difficulty === selectedDifficulty) &&
      (game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       game.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest": return b.rating - a.rating;
        case "popular": return b.totalPlayers - a.totalPlayers;
        case "difficulty": return b.difficulty.localeCompare(a.difficulty);
        case "xp": return b.xpPoints - a.xpPoints;
        default: return 0;
      }
    });

  if (!filteredGames.length) {
    return <NoGamesFound query={searchQuery} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    >
      {filteredGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </motion.div>
  );
});

GamesList.displayName = "GamesList"; 