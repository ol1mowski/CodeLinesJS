import React, { createContext, useContext, useState, useCallback } from 'react';
import { GameContent } from '../types/games.type';
import { API_URL } from '../../../../config/api.config';
import { useAuth } from '../../../../hooks/useAuth';

type GameContentContextType = {
  gameContent: GameContent | null;
  isLoading: boolean;
  error: string | null;
  fetchGameContent: (slug: string) => Promise<void>;
};

const GameContentContext = createContext<GameContentContextType | null>(null);

export const GameContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameContent, setGameContent] = useState<GameContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGameContent = useCallback(async (slug: string) => {
    setIsLoading(true);
    setError(null);
    const { token } = useAuth();

    try {
      const response = await fetch(`${API_URL}/games`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Nie udało się pobrać zawartości gry');
      }

      const data = await response.json();
      const game = data.data.games.find((g: any) => g.slug === slug);

      if (!game) {
        throw new Error('Nie znaleziono gry');
      }

      setGameContent({
        title: game.title,
        description: game.description,
        difficulty: game.difficulty,
        rating: game.rating,
        completions: game.completions,
        rewardPoints: game.rewardPoints,
        gameData: game.gameData,
        estimatedTime: game.estimatedTime,
        isCompleted: game.isCompleted
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <GameContentContext.Provider value={{ gameContent, isLoading, error, fetchGameContent }}>
      {children}
    </GameContentContext.Provider>
  );
};

export const useGameContent = () => {
  const context = useContext(GameContentContext);
  if (!context) {
    throw new Error('useGameContent must be used within a GameContentProvider');
  }
  return context;
}; 