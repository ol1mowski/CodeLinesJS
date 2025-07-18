import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import { GamesHeader } from './components/GamesHeader/GamesHeader.component';
import { GamesList } from './components/GamesList/GamesList.component';
import { GamesSorting } from './components/GamesSorting/GamesSorting.component';
import { GamesSearch } from './components/GamesSearch/GamesSearch.component';
import { GamesDifficulty } from './components/GamesDifficulty/GamesDifficulty.component';
import { GameDifficulty } from './types/games.types';
import { SEO } from '../../../utils/seo.util';

export type ActiveCategory = 'all' | 'basics' | 'algorithms' | 'challenges' | 'competitions';
export type SortOption = 'newest' | 'popular' | 'difficulty' | 'xp';

export const GamesSection = memo(() => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty | 'all'>('all');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full m-0 min-h-screen bg-dark/50 backdrop-blur-sm"
    >
      <SEO
        title="Gry"
        description="Gry CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku."
        type="website"
      />

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GamesHeader />

        <div className="mt-8 bg-dark-800/50 border border-js/10 rounded-xl p-4 sm:p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-72">
                <GamesSearch value={searchQuery} onChange={setSearchQuery} />
              </div>
              <GamesSorting activeSortOption={sortBy} onSortChange={setSortBy} />
            </div>

            <div className="mt-4">
              <GamesDifficulty
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={setSelectedDifficulty}
              />
            </div>
          </div>

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

GamesSection.displayName = 'GamesSection';
