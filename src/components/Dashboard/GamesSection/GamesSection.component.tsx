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
      className="min-h-screen bg-dark/50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GamesHeader />

        <div className="mt-8 bg-dark-800/50 border border-js/10 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-1">
              <GamesCategories 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
              />
            </div>
            
            <div className="flex flex-col lg:flex-row gap-4">
              <GamesSearch 
                value={searchQuery} 
                onChange={setSearchQuery} 
              />
              <GamesSorting 
                activeSortOption={sortBy} 
                onSortChange={setSortBy} 
              />
            </div>
          </div>

          <div className="mb-6">
            <GamesDifficulty 
              selectedDifficulty={selectedDifficulty} 
              onDifficultyChange={setSelectedDifficulty} 
            />
          </div>

          <GamesList
            activeCategory={activeCategory}
            sortBy={sortBy}
            searchQuery={searchQuery}
            selectedDifficulty={selectedDifficulty}
          />
        </div>
      </div>
    </motion.div>
  );
});

GamesSection.displayName = "GamesSection";