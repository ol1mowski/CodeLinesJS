import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { games } from '../../../data/games.data';

export const GameplayArea = memo(() => {
  const { slug } = useParams<{ slug: string }>();
  
  const game = games.find(g => g.id === slug);
  
  if (!game) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">Gra nie została znaleziona</div>
      </div>
    );
  }

  const GameComponent = game.component;
  
  return (
    <div className="w-full h-full">
      <GameComponent />
    </div>
  );
});

GameplayArea.displayName = 'GameplayArea'; 