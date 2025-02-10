import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Game } from "../types/games.types";
import { SortOption } from "../components/Dashboard/GamesSection/GamesSection.component";
import { GameDifficulty } from "../types/games.types";
import { mockGames } from "../mocks/gamesData.mock";

const filterAndSortGames = (
  games: Game[], 
  sortBy: SortOption,
  searchQuery: string,
  difficulty: GameDifficulty | "all"
): Game[] => {
  let filteredGames = [...games];

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredGames = filteredGames.filter(
      game => 
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
    );
  }

  if (difficulty !== "all") {
    filteredGames = filteredGames.filter(game => game.difficulty === difficulty);
  }

  switch (sortBy) {
    case "newest":
      return filteredGames.reverse();
    case "popular":
      return filteredGames.sort((a, b) => b.totalPlayers - a.totalPlayers);
    case "difficulty":
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      return filteredGames.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
    case "xp":
      return filteredGames.sort((a, b) => b.xpPoints - a.xpPoints);
    default:
      return filteredGames;
  }
};


export const useGames = (
  sortBy: SortOption = "newest", 
  searchQuery: string = "",
  difficulty: GameDifficulty | "all" = "all"
) => {
  const { data: games = [], isLoading } = useQuery<Game[]>({
    queryKey: ["games", sortBy, searchQuery, difficulty],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return filterAndSortGames(mockGames, sortBy, searchQuery, difficulty);
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    games,
    isLoading,
  };
};

export const useGamesLocal = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Symulacja opóźnienia ładowania
    const timer = setTimeout(() => {
      setGames(mockGames);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { games, isLoading };
}; 