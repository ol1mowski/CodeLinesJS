import { memo } from 'react';
import { motion } from "framer-motion";
import { IconType } from 'react-icons';

type LeaderboardUser = {
  name: string;
  points: string;
  avatar: string;
  badge: IconType;
};

type LeaderboardCardProps = {
  users: LeaderboardUser[];
};

export const LeaderboardCard = memo(({ users }: LeaderboardCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-6 rounded-xl border border-js/10 bg-dark/30"
  >
    <h3 className="text-xl font-bold text-js mb-4">Top Programiści</h3>
    <div className="space-y-4">
      {users.map((user, index) => (
        <motion.div
          key={user.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between group hover:bg-dark/50 p-3 rounded-lg 
                     transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-js/10 flex items-center justify-center text-2xl">
                {user.avatar}
              </div>
              <user.badge className="absolute -top-1 -right-1 w-5 h-5 text-js" />
            </div>
            <div>
              <p className="font-medium text-gray-300">{user.name}</p>
              <p className="text-sm text-gray-500">{user.points} pkt</p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 rounded-full bg-js/10 text-js text-sm font-medium"
          >
            #{index + 1}
          </motion.div>
        </motion.div>
      ))}
    </div>
  </motion.div>
));

LeaderboardCard.displayName = 'LeaderboardCard'; 