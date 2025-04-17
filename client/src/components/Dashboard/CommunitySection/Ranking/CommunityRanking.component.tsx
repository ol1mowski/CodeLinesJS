import { memo } from 'react';
import { RankingList } from './RankingList.component';
import { RankingStats } from './RankingStats.component';
import { useRankingData } from './hooks/useRankingData';
import { LoadingSpinner } from '../../../../components/UI/LoadingSpinner/LoadingSpinner.component';

const CommunityRanking = memo(() => {
  const { users, currentUserStats, isLoading, error } = useRankingData();

  if (isLoading) {
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
          </div>
          <RankingList users={users} />
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
