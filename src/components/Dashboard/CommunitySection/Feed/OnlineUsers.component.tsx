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
    <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
      <h2 className="text-xl font-bold text-js mb-4">Online</h2>
      <div className="space-y-4">
        {onlineUsers.map(user => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border border-js/10"
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