import { motion } from "framer-motion";
import { memo, useState } from "react";

import { GamesCategories } from "./GamesCategories/GamesCategories.component";
import { GamesHeader } from "./GamesHeader/GamesHeader.component";
import { GamesList } from "./GamesList/GamesList.component";

export type ActiveCategory = "all" | "basics" | "algorithms" | "challenges" | "competitions";

export const GamesSection = memo(() => {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-8"
    >
      <div className="space-y-8">
        <GamesHeader />
        <GamesCategories activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <GamesList activeCategory={activeCategory} />
      </div>
    </motion.div>
  );
});

GamesSection.displayName = "GamesSection";