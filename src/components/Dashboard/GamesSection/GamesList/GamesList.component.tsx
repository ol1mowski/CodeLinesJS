import { motion } from "framer-motion";
import { memo } from "react";
import { GameCard } from "./GameCard.component";
import { useGames } from "../../../../hooks/useGames";
import { GamesListSkeleton } from "./GamesListSkeleton.component";
import { Game } from "../../../../types/games.types";

export const GamesList = memo(() => {
  const { games, isLoading } = useGames();

  if (isLoading) {
    return <GamesListSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {games.map((game: Game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </motion.div>
  );
});

GamesList.displayName = "GamesList"; 