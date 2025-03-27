import { FaBrain, FaClock, FaCode, FaStar } from "react-icons/fa";

export const stats = [
  {
    icon: FaCode,
    label: "Ukończone Zadania",
    value: "42/50",
    progress: 84,
    color: "from-green-500/20 to-emerald-500/20",
    hoverColor: "from-green-500/30 to-emerald-500/30"
  },
  {
    icon: FaClock,
    label: "Czas Nauki",
    value: "28h 15m",
    progress: 70,
    color: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "from-blue-500/30 to-cyan-500/30"
  },
  {
    icon: FaStar,
    label: "Zdobyte Punkty",
    value: "2,450 XP",
    progress: 92,
    color: "from-yellow-500/20 to-amber-500/20",
    hoverColor: "from-yellow-500/30 to-amber-500/30"
  },
  {
    icon: FaBrain,
    label: "Skuteczność",
    value: "95%",
    progress: 95,
    color: "from-purple-500/20 to-pink-500/20",
    hoverColor: "from-purple-500/30 to-pink-500/30"
  }
]; 