import { motion } from "framer-motion";
import { memo } from "react";
import { FaCircle } from "react-icons/fa";

const onlineUsers = [
  { id: 1, name: "Anna Kowalska", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Jan Nowak", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Marta Wiśniewska", avatar: "https://i.pravatar.cc/150?img=3" },
];

export const OnlineUsers = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
    >
      <h3 className="text-lg font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-4">
        Online
      </h3>
      <div className="space-y-3">
        {onlineUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer"
          >
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-xs" />
            </div>
            <span className="text-gray-300">{user.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

OnlineUsers.displayName = "OnlineUsers"; 