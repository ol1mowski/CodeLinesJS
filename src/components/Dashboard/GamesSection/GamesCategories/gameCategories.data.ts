import { FaCode, FaLightbulb, FaPuzzlePiece, FaTrophy } from "react-icons/fa";
import { IconType } from "react-icons";

type GameCategory = {
  id: string;
  name: string;
  icon: IconType;
  gamesCount: number;
};

export const gameCategories: GameCategory[] = [
  {
    id: "basics",
    name: "Podstawy JS",
    icon: FaCode,
    gamesCount: 5,
  },
  {
    id: "algorithms",
    name: "Algorytmy",
    icon: FaLightbulb,
    gamesCount: 3,
  },
  {
    id: "challenges",
    name: "Wyzwania",
    icon: FaPuzzlePiece,
    gamesCount: 4,
  },
  {
    id: "competitions",
    name: "Konkursy",
    icon: FaTrophy,
    gamesCount: 2,
  },
]; 