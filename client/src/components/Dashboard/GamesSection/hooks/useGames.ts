import { httpClient } from "../../../../api/httpClient.api";
import { useState, useEffect } from 'react';
import { Game, GameDifficulty, SortOption } from '../types/games.types';


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
        const response = await httpClient.get('games');
        if (response.error) {
          setError(response.error);
          return;
        }
        if (response.data) {
          setGames(response.data);
        }
      } catch (err) {
        console.error('Błąd podczas pobierania gier:', err);
        setError('Wystąpił błąd podczas pobierania gier');
      } finally {
        setIsLoading(false);
      }
    };

    getGames();
  }, []);

  return { 
    games, 
    isLoading, 
    error 
  };
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
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
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
