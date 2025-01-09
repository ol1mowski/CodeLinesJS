import { useQuery } from "@tanstack/react-query";
import { Game } from "../types/games.types";
import { mockGames } from "../mocks/gamesData.mock";
import { SortOption } from "../components/Dashboard/GamesSection/GamesSection.component";

const sortGames = (games: Game[], sortBy: SortOption): Game[] => {
  const sortedGames = [...games];
  
  switch (sortBy) {
    case "newest":
      return sortedGames.reverse(); // Zakładając, że kolejność w mockGames to chronologiczna
    case "popular":
      return sortedGames.sort((a, b) => b.totalPlayers - a.totalPlayers);
    case "difficulty":
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      return sortedGames.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
    case "xp":
      return sortedGames.sort((a, b) => b.xpPoints - a.xpPoints);
    default:
      return sortedGames;
  }
};

export const useGames = (sortBy: SortOption = "newest") => {
  const { data: games = [], isLoading } = useQuery<Game[]>({
    queryKey: ["games", sortBy],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return sortGames(mockGames, sortBy);
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    games,
    isLoading,
  };
}; 