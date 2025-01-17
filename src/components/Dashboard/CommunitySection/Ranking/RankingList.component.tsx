import { memo } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaTrophy, FaCode, FaBullseye } from "react-icons/fa";
import { useRanking } from "../../../../Hooks/useRanking";
import { RankingPeriod } from "../../../../types/ranking.types";
import { HiOutlineTrophy } from "react-icons/hi2";

type RankingListProps = {
  period: RankingPeriod;
};

export const RankingList = memo(({ period }: RankingListProps) => {
  const { data: users, isLoading } = useRanking(period);

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
      {users.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-4 hover:border-js/20 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <FaUserCircle className="w-12 h-12 text-gray-400" />
              )}
              {index < 3 && (
                <div className="absolute -top-2 -right-2 bg-js rounded-full p-1">
                  <FaTrophy className="w-4 h-4 text-dark" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="font-bold text-gray-200">{user.name}</div>
              <div className="text-sm text-gray-400">
                Poziom {user.level} • {user.points} punktów
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaCode className="text-js" />
              <span className="text-js font-bold">{user.stats.completedChallenges}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBullseye className="text-js" />
              <span className="text-js font-bold">{user.stats.accuracy}%</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

RankingList.displayName = "RankingList"; 