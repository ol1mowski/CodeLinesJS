import { memo } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaTrophy, FaCode, FaBullseye } from "react-icons/fa";
import { useRanking } from "./hooks/useRanking";
import { RankingPeriod, RankingUser } from "../../../../types/ranking.types";

type RankingListProps = {
  period: RankingPeriod;
};

export const RankingList = memo(({ period }: RankingListProps) => {
  const { data: users, isLoading } = useRanking(period);

  if (isLoading) {
    return <RankingListSkeleton />;
  }

  return (
    <div className="space-y-4">
      {users?.map((user) => (
        <RankingCard key={user.id} user={user} />
      ))}
    </div>
  );
});

const RankingCard = memo(({ user }: { user: RankingUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark/30 backdrop-blur-sm rounded-lg p-4 hover:bg-dark/40 transition-colors border border-js/10"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full relative"
            />
          ) : (
            <FaUserCircle className="w-full h-full text-gray-600" />
          )}
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-js flex items-center justify-center text-sm font-bold text-dark">
            {user.rank}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-gray-200">{user.name}</span>
            <span className="text-sm text-gray-400">Poziom {user.level}</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1 text-js">
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
  );
});

RankingList.displayName = "RankingList";
RankingCard.displayName = "RankingCard";

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