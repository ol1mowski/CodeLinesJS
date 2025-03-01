import { motion } from "framer-motion";
import { HiOutlineTrophy } from "react-icons/hi2";
import { useRanking } from "./hooks/useRanking";

export const RankingList = () => {
  const { data, isLoading } = useRanking();
  const users = data?.ranking;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-4 animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-js/10" />
              <div className="flex-1">
                <div className="h-4 w-24 bg-js/10 rounded mb-2" />
                <div className="h-3 w-16 bg-js/10 rounded" />
              </div>
              <div className="h-6 w-16 bg-js/10 rounded" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        <HiOutlineTrophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <div>Brak danych rankingowych do wyświetlenia</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users?.map((user: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-4 hover:border-js/20 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="text-2xl font-bold text-js flex items-center justify-center w-12 h-12 rounded-full bg-js/10">
                {user.username.slice(0, 1)}
              </div>

              {index < 3 && (
                <div className="absolute -top-2 -right-2 rounded-full p-1 shadow-lg flex items-center justify-center w-8 h-8 text-sm font-bold text-dark"
                  style={{
                    background: index === 0
                      ? 'linear-gradient(45deg, #FFD700, #FFC107)'
                      : index === 1
                        ? 'linear-gradient(45deg, #C0C0C0, #B0B0B0)'
                        : 'linear-gradient(45deg, #CD7F32, #B87333)',
                  }}
                >
                  {user.rank}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="font-bold text-gray-200">{user.username}</div>
              <div className="text-sm text-gray-400">
                Poziom {user.stats.level} • {user.stats.points} punktów
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

RankingList.displayName = "RankingList"; 