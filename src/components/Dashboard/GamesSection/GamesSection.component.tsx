import { motion } from "framer-motion";
import { memo } from "react";
import { GamesHeader } from "./GamesHeader/GamesHeader.component";
import { GamesList } from "./GamesList/GamesList.component";
import { GamesCategories } from "./GamesCategories/GamesCategories.component";

export const GamesSection = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-8"
    >
      <div className="space-y-8">
        <GamesHeader />
        <GamesCategories />
        <GamesList />
      </div>
    </motion.div>
  );
});

GamesSection.displayName = "GamesSection"; 