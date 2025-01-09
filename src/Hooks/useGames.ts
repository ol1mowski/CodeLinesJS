import { useQuery } from "@tanstack/react-query";
import { Game } from "../types/games.types";
import { mockGames } from "../mocks/gamesData.mock";

export const useGames = () => {
  const { data: games = [], isLoading } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: async () => {
      // Symulacja opóźnienia sieciowego
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockGames;
    },
    staleTime: 1000 * 60 * 5, // 5 minut
  });

  return {
    games,
    isLoading,
  };
}; 