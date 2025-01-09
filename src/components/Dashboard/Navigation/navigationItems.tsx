import { FaChartBar, FaGamepad, FaTrophy, FaUsers, FaCog, FaBook } from "react-icons/fa";
import { NavigationItem } from "./Navigation.types";

export const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <FaChartBar />,
    section: "main",
    path: "/dashboard",
  },
  {
    id: "stats",
    label: "Statystyki",
    icon: <FaTrophy />,
    section: "main",
    path: "/dashboard/stats",
  },
  {
    id: "play",
    label: "Graj",
    icon: <FaGamepad />,
    section: "game",
    path: "/dashboard/play",
  },
  {
    id: "learn",
    label: "Nauka",
    icon: <FaBook />,
    section: "game",
    path: "/dashboard/learn",
  },
  {
    id: "community",
    label: "Społeczność",
    icon: <FaUsers />,
    section: "social",
    path: "/dashboard/community",
  },
  {
    id: "settings",
    label: "Ustawienia",
    icon: <FaCog />,
    section: "social",
    path: "/dashboard/settings",
  },
  {
    id: "games",
    label: "Gry",
    icon: <FaGamepad />,
    section: "main",
    path: "/dashboard/games",
  },
]; 