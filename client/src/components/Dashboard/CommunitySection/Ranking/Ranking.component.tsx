import { memo } from 'react';
import { useRankingData } from './hooks/useRankingData';
import { LoadingSpinner } from '../../../../components/UI/LoadingSpinner/LoadingSpinner.component';
import { UserAvatar } from './components/UserAvatar';
import { RankingPosition } from './components/RankingPosition';

export const Ranking = memo(() => {
  const { users, isLoading, error } = useRankingData();

  if (isLoading) {
    return <LoadingSpinner text="Ładowanie rankingu..." />;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 text-2xl mb-2">Błąd ładowania</div>
        <p className="text-gray-400">
          {error instanceof Error ? error.message : 'Nie udało się załadować danych rankingu. Spróbuj ponownie później.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-dark/20 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-js mb-4">Ranking</h2>
        <p className="text-gray-300">
          Ranking najlepszych programistów w społeczności CodeLinesJS. 
          Zdobywaj punkty za rozwiązywanie zadań, gry i aktywność w społeczności.
        </p>
      </div>
      
      {users.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400 text-lg">Brak danych rankingowych do wyświetlenia.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-js/10">
          <table className="min-w-full divide-y divide-js/10">
            <thead className="bg-js/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pozycja</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Użytkownik</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Poziom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Punkty</th>
              </tr>
            </thead>
            <tbody className="bg-dark/30 divide-y divide-js/10">
              {users.map((user, index) => {
                const position = user.position || index + 1;
                const level = user.stats?.level || user.level;
                const points = user.stats?.points || user.points;
                
                return (
                  <tr key={user.id || user._id || index} className={index < 3 ? 'bg-js/5' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RankingPosition position={position} size="sm" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserAvatar 
                          username={user.username} 
                          avatar={user.avatar} 
                          size="sm" 
                          className="mr-3" 
                        />
                        <div className="text-sm font-medium text-white">{user.username}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-js font-semibold">
                      {points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

Ranking.displayName = 'Ranking'; 