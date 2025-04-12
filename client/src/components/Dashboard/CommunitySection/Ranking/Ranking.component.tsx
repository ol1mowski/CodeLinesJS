import { memo } from 'react';
import { useRanking, RankingUserResponse } from './hooks/useRanking';
import { LoadingSpinner } from '../../../../components/UI/LoadingSpinner/LoadingSpinner.component';

export const Ranking = memo(() => {
  const { data, isLoading, error } = useRanking();

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

  const rankingData = data || [];

  return (
    <div className="space-y-6">
      <div className="bg-dark/20 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-js mb-4">Ranking</h2>
        <p className="text-gray-300">
          Ranking najlepszych programistów w społeczności CodeLinesJS. 
          Zdobywaj punkty za rozwiązywanie zadań, gry i aktywność w społeczności.
        </p>
      </div>
      
      {rankingData.length === 0 ? (
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
              {rankingData.map((user: RankingUserResponse, index: number) => (
                <tr key={user.id || user._id} className={index < 3 ? 'bg-js/5' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`
                      flex items-center justify-center w-6 h-6 rounded-full text-sm font-semibold
                      ${index === 0 ? 'bg-yellow-500 text-dark' : 
                        index === 1 ? 'bg-gray-300 text-dark' : 
                        index === 2 ? 'bg-amber-700 text-dark' : 
                        'bg-js/10 text-gray-300'}
                    `}>
                      {user.position || index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-js/30 flex items-center justify-center text-dark mr-3">
                        {user.avatar || user.username.charAt(0)}
                      </div>
                      <div className="text-sm font-medium text-white">{user.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-js font-semibold">
                    {user.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

Ranking.displayName = 'Ranking'; 