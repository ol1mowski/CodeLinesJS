import { useState, useEffect } from 'react';
import { Game, GameDifficulty, SortOption } from '../types/games.types';
import { useApi } from '../../../../api/hooks/useApi.hook';

type UseGamesReturn = {
  games: Game[];
  isLoading: boolean;
  error: string | null;
};

export const useGames = (): UseGamesReturn => {
  const [games, setGames] = useState<Game[]>([]);
  const api = useApi<{ data: { games: Game[] } }>();

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await api.get('games');
        if (response.error) {
          return;
        }
        if (response.data) {
          setGames(response.data.data.games);
        }
      } catch (err) {
        console.error('Błąd podczas pobierania gier:', err);
      }
    };

    getGames();
  }, [api]);

  return { 
    games, 
    isLoading: api.loading, 
    error: api.error 
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
