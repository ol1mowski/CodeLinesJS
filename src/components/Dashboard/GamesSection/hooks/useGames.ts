import { useState, useEffect } from 'react';
import { Game } from '../types/api.types';

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
    const fetchGames = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        const response = await fetch('http://localhost:5001/api/games', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Nie udało się pobrać listy gier');
        }

        const data = await response.json();
        setGames(data.data.games);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
        console.error('Błąd podczas pobierania gier:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, isLoading, error };
}; 