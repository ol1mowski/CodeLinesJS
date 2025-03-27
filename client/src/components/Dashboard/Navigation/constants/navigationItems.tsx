import { FaChartBar, FaGamepad, FaCog, FaBook, FaCode, FaHome, FaBug } from "react-icons/fa";
import { NavigationItem } from "../types/navigation.types";

export const navigationItems: NavigationItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: <FaHome />,
        section: "main",
        path: "/dashboard",
      },
      {
        id: "stats",
        label: "Statystyki",
        icon: <FaChartBar />,
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
        id: "code",
        label: "Edytor",
        icon: <FaCode />,
        section: "game",
        path: "/dashboard/code",
      },
      // {
      //   id: "community",
      //   label: "Społeczność",
      //   icon: <FaUsers />,
      //   section: "social",
      //   path: "/dashboard/community",
      // },
      {
        id: "settings",
        label: "Ustawienia",
        icon: <FaCog />,
        section: "social",
        path: "/dashboard/settings",
      },
      {
        id: "report",
        label: "Zgłoś błąd",
        icon: <FaBug />,
        section: "social",
        path: "/dashboard/report",
      },
]; 