import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaTrophy, FaCode, FaBullseye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRanking } from "../../../../hooks/useRanking";
import { RankingPeriod, RankingUser } from "../../../../types/ranking.types";
import { MemoizedVirtualList } from "../../../Common/VirtualList.component";

type RankingListProps = {
  period: RankingPeriod;
};

export const RankingList = memo(({ period }: RankingListProps) => {
  const [page, setPage] = useState(0);
  const {
    users,
    isLoading,
    isPreviousData,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage
  } = useRanking(period, page);

  const handlePreviousPage = useCallback(() => {
    setPage(old => Math.max(0, old - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    if (!isPreviousData && hasNextPage) {
      setPage(old => old + 1);
    }
  }, [isPreviousData, hasNextPage]);

  if (isLoading) {
    return <RankingListSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="h-[600px]">
        <MemoizedVirtualList
          items={users || []}
          renderItem={(user) => <RankingCard key={user.id} user={user} />}
          itemHeight={100}
          className="h-full"
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        <button
          onClick={handlePreviousPage}
          disabled={!hasPreviousPage}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${hasPreviousPage
              ? "text-gray-200 hover:bg-gray-700/30"
              : "text-gray-600 cursor-not-allowed"
            }`}
        >
          <FaChevronLeft />
          Poprzednia
        </button>

        <span className="text-gray-400">
          Strona {currentPage || 1} z {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={isPreviousData || !hasNextPage}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${hasNextPage && !isPreviousData
              ? "text-gray-200 hover:bg-gray-700/30"
              : "text-gray-600 cursor-not-allowed"
            }`}
        >
          Następna
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
});

const RankingCard = memo(({ user }: { user: RankingUser }) => {
  const renderBadges = useCallback(() => (
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
  ), [user.badges]);

  return (
    <motion.div
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
              className="w-full h-full rounded-full relative"
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
            {renderBadges()}
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