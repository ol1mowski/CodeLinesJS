import { useState, useEffect } from 'react';
import { Game } from '../types/api.types';
import { fetchGames } from '../api/fetchGames.api';
import { GameDifficulty, SortOption } from '../types/games.types';

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
        const response = await fetchGames();
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

export const useFilteredGames = (
  games: Game[] | undefined,
  sortBy: SortOption,
  searchQuery: string,
  selectedDifficulty: GameDifficulty | 'all'
) => {
  if (!games) return [];

  return games
    .filter(
      game =>
        (selectedDifficulty === 'all' || game.difficulty === selectedDifficulty) &&
        (game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
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
};
