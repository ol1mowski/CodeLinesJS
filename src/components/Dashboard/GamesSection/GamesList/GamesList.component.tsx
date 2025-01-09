import { motion, AnimatePresence } from "framer-motion";
import { memo, useMemo } from "react";
import { GameCard } from "./GameCard.component";
import { useGames } from "../../../../hooks/useGames";
import { GamesListSkeleton } from "./GamesListSkeleton.component";
import { ActiveCategory } from "../GamesSection.component";

type GamesListProps = {
  activeCategory: ActiveCategory;
};

export const GamesList = memo(({ activeCategory }: GamesListProps) => {
  const { games, isLoading } = useGames();

  const filteredGames = useMemo(() => {
    if (activeCategory === "all") return games;
    return games.filter(game => game.category === activeCategory);
  }, [games, activeCategory]);

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
              layout: { duration: 0.3 },
              scale: { duration: 0.3 }
            }}
          >
            <GameCard game={game} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
});

GamesList.displayName = "GamesList"; 