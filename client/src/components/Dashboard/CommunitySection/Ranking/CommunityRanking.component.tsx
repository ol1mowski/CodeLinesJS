import { memo } from 'react';
import { RankingList } from './RankingList.component';
import { RankingStats } from './RankingStats.component';
import { useRankingData } from './hooks/useRankingData';
import { LoadingSpinner } from '../../../../components/UI/LoadingSpinner/LoadingSpinner.component';

const CommunityRanking = memo(() => {
  const { users, currentUserStats, isLoading, error, pagination } = useRankingData();

  if (isLoading && !pagination.page) {
    return <LoadingSpinner text="Ładowanie rankingu..." />;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 text-2xl mb-2">Błąd ładowania</div>
        <p className="text-gray-400">
          {error instanceof Error
            ? error.message
            : 'Nie udało się załadować danych rankingu. Spróbuj ponownie później.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-js">Ranking</h2>
            {pagination.isLoadingPage && (
              <div className="text-xs text-gray-400 flex items-center">
                <svg className="animate-spin h-4 w-4 mr-2 text-js" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Aktualizowanie...
              </div>
            )}
          </div>
          <RankingList users={users} pagination={pagination} />
        </div>
      </div>
      <div className="space-y-6">
        <RankingStats currentUserStats={currentUserStats} />
      </div>
    </div>
  );
});

export default CommunityRanking;

CommunityRanking.displayName = 'CommunityRanking';
