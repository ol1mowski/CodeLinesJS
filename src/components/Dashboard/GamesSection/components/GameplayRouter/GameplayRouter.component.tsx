import { memo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { GameplaySection } from '../GameplaySection/GameplaySection.component';
import { useGamesQuery } from '../../hooks/useGamesQuery';

export const GameplayRouter = memo(() => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useGamesQuery();

  if (!data?.games) return null;

  const game = data.games.find(g => g.slug === slug);

  if (!game) {
    return <Navigate to="/dashboard/play" replace />;
  }

  return (
    <GameplaySection 
      game={game}
    />
  );
});

GameplayRouter.displayName = 'GameplayRouter'; 