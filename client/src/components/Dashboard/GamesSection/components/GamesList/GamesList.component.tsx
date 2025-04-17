import { motion } from 'framer-motion';
import { memo } from 'react';
import { GamesListSkeleton } from './GamesListSkeleton.component';
import { NoGamesFound } from './NoGamesFound.component';
import { GameCard } from './GameCard.component';
import { SortOption } from '../../GamesSection.component';
import { Game as DashboardGame, GameDifficulty } from '../../types/games.types';
import { useGamesQuery } from '../../hooks/useGamesQuery';
import { Game } from '../../../../../types/games.types';

type GamesListProps = {
  sortBy: SortOption;
  searchQuery: string;
  selectedDifficulty: GameDifficulty | 'all';
};

export const GamesList = memo(({ sortBy, searchQuery, selectedDifficulty }: GamesListProps) => {
  const { data, isLoading, isError } = useGamesQuery();

  if (isLoading) return <GamesListSkeleton />;

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">
          Wystąpił błąd podczas ładowania gier. Spróbuj ponownie później.
        </p>
      </div>
    );
  }

  if (!data?.games) return null;

  const filteredGames = data.games
    .filter(
      (game: DashboardGame) =>
        (selectedDifficulty === 'all' || game.difficulty === selectedDifficulty) &&
        (game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a: DashboardGame, b: DashboardGame) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return b.completions.count - a.completions.count;
        case 'difficulty':
          return b.difficulty.localeCompare(a.difficulty);
        case 'xp':
          return b.rewardPoints - a.rewardPoints;
        default:
          return 0;
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
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
    >
      {filteredGames.map((dashboardGame: DashboardGame) => {
        const game: Game = {
          _id: dashboardGame._id,
          id: dashboardGame._id,
          slug: dashboardGame.slug,
          isLevelAvailable: dashboardGame.isLevelAvailable,
          title: dashboardGame.title,
          description: dashboardGame.description,
          difficulty: dashboardGame.difficulty,
          category: 'game',
          isCompleted: false,
          rating: {
            average: 0,
            count: 0,
          },
          completions: dashboardGame.completions,
          completedCount: dashboardGame.completions.count,
          thumbnailUrl: '',
          rewardPoints: dashboardGame.rewardPoints,
          xpPoints: dashboardGame.rewardPoints,
          requiredLevel: dashboardGame.requiredLevel,
        };

        return <GameCard key={game._id} game={game} />;
      })}
    </motion.div>
  );
});

GamesList.displayName = 'GamesList';
