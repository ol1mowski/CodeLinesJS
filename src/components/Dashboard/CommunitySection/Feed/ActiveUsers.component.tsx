import { memo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

type User = {
  users: {
    _id: string;
    username: string;
    isActive: boolean;
  }[];
  totalActive: number;
};

export const ActiveUsers = memo(() => {
  const { data: users } = useQuery<User[]>({
    queryKey: ['activeUsers'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5001/api/users/active', {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token') || localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Nie udało się pobrać aktywnych użytkowników');
      const data = await response.json();
      console.log(data);
      return data;
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
        {users?.users.map((user) => (
          <motion.div
            key={user._id}
            className="relative group"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-10 h-10 rounded-full relative">
              <div className="w-full h-full rounded-full bg-js/20 flex items-center justify-center border-2 border-dark/50">
                {user.username.charAt(0).toUpperCase()}
              </div>
              {user.isActive && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
              )}
            </div>
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