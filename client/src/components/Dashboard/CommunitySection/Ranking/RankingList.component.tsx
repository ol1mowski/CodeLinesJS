import { memo } from 'react';
import { HiOutlineTrophy, HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { RankingUser } from './types/ranking.types';
import { RankingItem } from './components/RankingItem';
import { LoadingSpinner } from '../../../UI/LoadingSpinner/LoadingSpinner.component';

interface RankingListProps {
  users: RankingUser[];
  isLoading?: boolean;
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

export const RankingList = memo(({ users, isLoading = false, pagination }: RankingListProps) => {
  if (isLoading) {
    return <LoadingSpinner fullScreen text="Ładowanie rankingu..." />;
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
    <div>
      <div className="space-y-4">
        {users.map((user, index) => (
          <RankingItem key={`${user.username}-${user.position}`} user={user} index={index} />
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

          <div className="text-gray-400 flex items-center">
            {pagination.isLoadingPage ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2 text-js" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-js">Ładowanie...</span>
              </>
            ) : (
              `Strona ${pagination.page} z ${pagination.totalPages || 1}`
            )}
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
