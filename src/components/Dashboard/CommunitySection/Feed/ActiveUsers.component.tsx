import { memo } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

type User = {
  _id: string;
  username: string;
  avatar?: string;
  isActive: boolean;
  lastActive: Date;
};

export const ActiveUsers = memo(() => {
  const { data: users } = useQuery<User[]>({
    queryKey: ['activeUsers'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5001/api/users/active');
      if (!response.ok) throw new Error('Nie udało się pobrać aktywnych użytkowników');
      return response.json();
    },
    refetchInterval: 30000
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-4 mb-6"
    >
      <h3 className="text-js text-sm font-medium mb-3">Aktywni użytkownicy</h3>
      <div className="flex items-center gap-2">
        {users?.slice(0, 8).map((user) => (
          <motion.div
            key={user._id}
            className="relative group"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-10 h-10 rounded-full relative">

              <div className="w-full h-full rounded-full bg-js/20 flex items-center justify-center border-2 border-dark/50">
                <FaUserCircle className="w-6 h-6 text-js" />
              </div>

              {user.isActive && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-dark/90 px-2 py-1 rounded-md 
                         text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100
                         transition-opacity pointer-events-none border border-js/10"
            >
              {user.username}
            </motion.div>
          </motion.div>
        ))}

        {users && users.length > 8 && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-js/10 flex items-center justify-center
                     text-js text-sm font-medium border-2 border-dark/50"
          >
            +{users.length - 8}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

ActiveUsers.displayName = "ActiveUsers"; 