import { motion } from "framer-motion";
import { memo } from "react";
import { FaTrophy, FaUsers, FaCode } from "react-icons/fa";

const stats = [
  {
    icon: FaTrophy,
    label: "Twoja pozycja",
    value: "#42",
    change: "+5",
    gradient: "from-js/20 to-js/30",
  },
  {
    icon: FaUsers,
    label: "Aktywni gracze",
    value: "2,547",
    change: "+123",
    gradient: "from-js/20 to-js/30",
  },
  {
    icon: FaCode,
    label: "Ukończone wyzwania",
    value: "156",
    change: "+12",
    gradient: "from-js/20 to-js/30",
  },
];

export const RankingStats = memo(() => (
  <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
    <h2 className="text-xl font-bold text-js mb-6">Twoje Statystyki</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map(stat => (
        <motion.div
          key={stat.label}
          className="bg-dark/20 rounded-lg p-4 border border-js/5"
          whileHover={{ scale: 1.02 }}
        >
          <stat.icon className="w-6 h-6 text-js mb-2" />
          <p className="text-gray-400 text-sm">{stat.label}</p>
          <p className="text-2xl font-bold text-js">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
));

RankingStats.displayName = "RankingStats"; 