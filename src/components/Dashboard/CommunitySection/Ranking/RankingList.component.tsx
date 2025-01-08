import { motion } from "framer-motion";
import { memo } from "react";
import { FaUserCircle, FaTrophy, FaCode, FaBullseye } from "react-icons/fa";
import { useRanking } from "../../../../hooks/useRanking";
import { RankingPeriod } from "../../../../types/ranking.types";

type RankingListProps = {
  period: RankingPeriod;
};

export const RankingList = memo(({ period }: RankingListProps) => {
  const { users, isLoading } = useRanking(period);

  if (isLoading) {
    return <RankingListSkeleton />;
  }

  return (
    <div className="space-y-4">
      {users?.map((user) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/40 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-600" />
              )}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold text-white">
                {user.rank}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-200">{user.name}</span>
                <span className="text-sm text-gray-400">Poziom {user.level}</span>
                <div className="flex gap-1">
                  {user.badges.map((badge) => (
                    <span
                      key={badge.id}
                      title={badge.name}
                      className="text-lg"
                    >
                      {badge.icon}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1 text-indigo-400">
                  <FaTrophy className="text-xs" />
                  <span>{user.points} pkt</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400">
                  <FaCode className="text-xs" />
                  <span>{user.stats.completedChallenges} wyzwań</span>
                </div>
                <div className="flex items-center gap-1 text-orange-400">
                  <FaBullseye className="text-xs" />
                  <span>{user.stats.accuracy}% celności</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

RankingList.displayName = "RankingList";

const RankingListSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-gray-700/30 rounded-lg p-4 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-600" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-gray-600 rounded" />
            <div className="flex gap-4">
              <div className="h-3 w-20 bg-gray-600 rounded" />
              <div className="h-3 w-24 bg-gray-600 rounded" />
              <div className="h-3 w-16 bg-gray-600 rounded" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
); 