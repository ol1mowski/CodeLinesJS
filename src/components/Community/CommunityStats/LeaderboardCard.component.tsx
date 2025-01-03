import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";

import { topUsers } from "../../../data/communityStats.data";

export const LeaderboardCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
  >
    <h3 className="text-xl font-bold font-space text-gray-100 mb-4 flex items-center gap-2">
      <FaCrown className="text-yellow-500" />
      Top Programiści
    </h3>
    <div className="space-y-4">
      {topUsers.map((user, index) => (
        <div
          key={user.name}
          className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/40 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center font-bold text-white">
            {index + 1}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-100">{user.name}</h4>
            <p className="text-sm text-gray-400">{user.points} punktów</p>
          </div>
          <div className="flex gap-1">
            {user.badges.map((badge, i) => (
              <span
                key={i}
                className="w-6 h-6 flex items-center justify-center text-lg"
                title={badge.title}
              >
                {badge.icon}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
); 