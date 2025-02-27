import { useState, useEffect } from 'react';
import { Game } from '../types/api.types';
import { fetchGames } from '../api/fetchGames.api';
import { useAuth } from '../../../../Hooks/useAuth';

type UseGamesReturn = {
  games: Game[];
  isLoading: boolean;
  error: string | null;
};

export const useGames = (): UseGamesReturn => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGames = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { token } = useAuth();
        const response = await fetchGames(token || '');
        const data = await response.json();
        setGames(data.data.games);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
        console.error('Błąd podczas pobierania gier:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getGames();
  }, []);

  return { games, isLoading, error };
}; 