import { motion } from "framer-motion";
import { memo, useState } from "react";
import { GamesCategories } from "./GamesCategories/GamesCategories.component";
import { GamesHeader } from "./GamesHeader/GamesHeader.component";
import { GamesList } from "./GamesList/GamesList.component";
import { GamesSorting } from "./GamesSorting/GamesSorting.component";
import { GamesSearch } from "./GamesSearch/GamesSearch.component";
import { GamesDifficulty } from "./GamesDifficulty/GamesDifficulty.component";
import { GameDifficulty } from "../../../types/games.types";

export type ActiveCategory = "all" | "basics" | "algorithms" | "challenges" | "competitions";
export type SortOption = "newest" | "popular" | "difficulty" | "xp";

export const GamesSection = memo(() => {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty | "all">("all");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-8"
    >
      <div className="space-y-8">
        <GamesHeader />
        <div className="flex flex-col lg:flex-row gap-6">
          <GamesCategories activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <div className="flex flex-col lg:flex-row gap-4 lg:ml-auto">
            <GamesSearch value={searchQuery} onChange={setSearchQuery} />
            <GamesSorting activeSortOption={sortBy} onSortChange={setSortBy} />
          </div>
        </div>
        <GamesDifficulty 
          selectedDifficulty={selectedDifficulty} 
          onDifficultyChange={setSelectedDifficulty} 
        />
        <GamesList 
          activeCategory={activeCategory} 
          sortBy={sortBy} 
          searchQuery={searchQuery}
          selectedDifficulty={selectedDifficulty}
        />
      </div>
    </motion.div>
  );
});

GamesSection.displayName = "GamesSection";