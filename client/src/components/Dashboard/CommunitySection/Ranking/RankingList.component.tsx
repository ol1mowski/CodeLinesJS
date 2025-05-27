import { memo } from 'react';
import { HiOutlineTrophy, HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { RankingUser } from './types/ranking.types';
import { RankingItem } from './components/RankingItem';

interface RankingListProps {
  users: RankingUser[];
  pagination?: {
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: () => void;
    prevPage: () => void;
    goToPage?: (page: number) => void;
    isLoadingPage: boolean;
  };
}

export const RankingList = memo(({ users, pagination }: RankingListProps) => {
  if (!users?.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        <HiOutlineTrophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <div>Brak danych rankingowych do wyświetlenia</div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {users.map((user, index) => (
          <RankingItem key={user.id || user._id || index} user={user} index={index} />
        ))}
      </div>
      
      {pagination && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-js/10">
          <button
            onClick={pagination.prevPage}
            disabled={!pagination.hasPrevPage || pagination.isLoadingPage}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition
              ${pagination.hasPrevPage && !pagination.isLoadingPage
                ? 'text-js hover:bg-js/10'
                : 'text-gray-500 cursor-not-allowed'}`}
            aria-label="Poprzednia strona"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span>Poprzednia</span>
          </button>

          <div className="text-gray-400">
            Strona {pagination.page} z {pagination.totalPages || 1}
          </div>

          <button
            onClick={pagination.nextPage}
            disabled={!pagination.hasNextPage || pagination.isLoadingPage}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition
              ${pagination.hasNextPage && !pagination.isLoadingPage
                ? 'text-js hover:bg-js/10'
                : 'text-gray-500 cursor-not-allowed'}`}
            aria-label="Następna strona"
          >
            <span>Następna</span>
            <HiArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
});

RankingList.displayName = 'RankingList';
