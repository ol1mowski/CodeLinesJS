import { memo } from 'react';
import { useGames } from '../../hooks/useGames';
import { GameCard } from '../GamesList/GameCard.component';

export const GamesSection = memo(() => {
  const { games, isLoading, error } = useGames();

  if (isLoading) return <div>Ładowanie gier...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {games.map(game => (
        <GameCard
          key={game._id}
          id={game._id}
          title={game.title}
          description={game.description}
          difficulty={game.difficulty}
          category={game.category}
          isCompleted={game.isCompleted}
          estimatedTime={game.estimatedTime}
          rating={game.rating}
          completions={game.completions}
        />
      ))}
    </div>
  );
});

GamesSection.displayName = 'GamesSection'; 