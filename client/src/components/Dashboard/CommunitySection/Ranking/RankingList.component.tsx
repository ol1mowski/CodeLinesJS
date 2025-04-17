import { memo } from 'react';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { useRankingData } from './hooks/useRankingData';
import { RankingItem } from './components/RankingItem';
import { LoadingScreen } from '../../../UI/LoadingScreen/LoadingScreen.component';

export const RankingList = memo(() => {
  const { users, isLoading } = useRankingData();

  isLoading && <LoadingScreen />;

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
        <RankingItem key={user.id || user._id || index} user={user} index={index} />
      ))}
    </div>
  );
});

RankingList.displayName = 'RankingList';
