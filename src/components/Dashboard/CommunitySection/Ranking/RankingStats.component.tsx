import { motion } from "framer-motion";
import { memo } from "react";
import { FaTrophy, FaUsers, FaCode } from "react-icons/fa";

const stats = [
  {
    icon: FaTrophy,
    label: "Twoja pozycja",
    value: "#42",
    change: "+5",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: FaUsers,
    label: "Aktywni gracze",
    value: "2,547",
    change: "+123",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: FaCode,
    label: "Ukończone wyzwania",
    value: "156",
    change: "+12",
    gradient: "from-emerald-500 to-green-500",
  },
];

export const RankingStats = memo(() => {
  return (
    <div className="space-y-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center gap-4">
              <div className={`
                p-3 rounded-lg bg-gradient-to-br ${stat.gradient}
                flex items-center justify-center
              `}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-emerald-400">
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
});

RankingStats.displayName = "RankingStats"; 