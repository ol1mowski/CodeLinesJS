import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '../types/api.types';

const fetchGames = async (): Promise<ApiResponse> => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  const response = await fetch('http://localhost:5001/api/games', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useGamesQuery = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
    select: (data) => ({
      games: data.data.games,
      pagination: data.data.pagination
    }),
    staleTime: 5 * 60 * 1000, 
  });
}; 