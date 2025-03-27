import { memo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchActiveUsers } from "../api/fetchActiveUsers.api";
import { useAuth } from "../../../../Hooks/useAuth";

type User = {
  users: {
    _id: string;
    username: string;
    isActive: boolean;
  }[];
  totalActive: number;
};

export const ActiveUsers = memo(() => {
  const { token } = useAuth();
  const { data } = useQuery<User>({
    queryKey: ['activeUsers'],
    queryFn: () => fetchActiveUsers(token || ""),
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
        {data?.users.map((user) => (
          <motion.div
            key={user._id}
            className="relative group"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-10 h-10 rounded-full relative">
              <div className="w-10 h-10 rounded-full bg-js flex items-center justify-center">
                <span className="text-dark font-bold text-xl">{user.username.charAt(0).toUpperCase()}</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          </motion.div>
        ))}

        {data?.users.length && data.users.length > 8 && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-js/10 flex items-center justify-center
                     text-js text-sm font-medium border-2 border-dark/50"
          >
            +{data.users.length - 8}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

ActiveUsers.displayName = "ActiveUsers"; 