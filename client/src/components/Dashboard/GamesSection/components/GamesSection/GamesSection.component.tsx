import { memo } from 'react';
import { useGames } from '../../hooks/useGames';
import { GameCard } from '../GamesList/GameCard.component';
import { Game as GameCardGame } from '../../types/games.types';

export const GamesSection = memo(() => {
  const { games, isLoading, error } = useGames();

  if (isLoading) return <div>Ładowanie gier...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {games.map(game => {
        const gameCardProps: GameCardGame = {
          _id: game._id,
          id: game._id,
          slug: game.slug,
          title: game.title,
          description: game.description,
          difficulty: game.difficulty,
          category: game.category,
          isCompleted: game.isCompleted,
          rating: {
            average: game.rating.average,
            count: game.rating.count,
          },
          completions: {
            count: game.completions.count,
          },
          rewardPoints: game.rewardPoints,
          completedCount: game.completions.count,
          thumbnailUrl: '',
          xpPoints: game.rewardPoints,
          isLevelAvailable: game.isLevelAvailable,
          requiredLevel: game.requiredLevel,
        };

        return <GameCard key={game._id} game={gameCardProps} />;
      })}
    </div>
  );
});

GamesSection.displayName = 'GamesSection';
