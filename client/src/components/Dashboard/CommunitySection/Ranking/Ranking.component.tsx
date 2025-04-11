import { memo } from 'react';
import { useRanking } from './hooks/useRanking';
import { LoadingSpinner } from '../../../../components/UI/LoadingSpinner/LoadingSpinner.component';

interface RankingUser {
  id: number;
  username: string;
  points: number;
  level: number;
  avatar: string | null;
}

export const Ranking = memo(() => {
  const { data, isLoading, error } = useRanking();

  if (isLoading) {
    return <LoadingSpinner text="Ładowanie rankingu..." />;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 text-2xl mb-2">Błąd ładowania</div>
        <p className="text-gray-400">Nie udało się załadować danych rankingu. Spróbuj ponownie później.</p>
      </div>
    );
  }

  const rankingData: RankingUser[] = data || [
    { id: 1, username: 'TopCoder', points: 2450, level: 25, avatar: null },
    { id: 2, username: 'JSMaster', points: 2100, level: 22, avatar: null },
    { id: 3, username: 'WebDevPro', points: 1950, level: 20, avatar: null },
    { id: 4, username: 'CodeNinja', points: 1800, level: 18, avatar: null },
    { id: 5, username: 'ReactWizard', points: 1720, level: 17, avatar: null },
    { id: 6, username: 'FrontendGuru', points: 1650, level: 16, avatar: null },
    { id: 7, username: 'DebugHero', points: 1550, level: 15, avatar: null },
    { id: 8, username: 'AlgorithmKing', points: 1500, level: 14, avatar: null },
    { id: 9, username: 'TSExpert', points: 1450, level: 13, avatar: null },
    { id: 10, username: 'WebArtisan', points: 1400, level: 12, avatar: null },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-dark/20 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-js mb-4">Ranking</h2>
        <p className="text-gray-300">
          Ranking najlepszych programistów w społeczności CodeLinesJS. 
          Zdobywaj punkty za rozwiązywanie zadań, gry i aktywność w społeczności.
        </p>
      </div>
      
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
            {rankingData.map((user: RankingUser, index: number) => (
              <tr key={user.id} className={index < 3 ? 'bg-js/5' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`
                    flex items-center justify-center w-6 h-6 rounded-full text-sm font-semibold
                    ${index === 0 ? 'bg-yellow-500 text-dark' : 
                      index === 1 ? 'bg-gray-300 text-dark' : 
                      index === 2 ? 'bg-amber-700 text-dark' : 
                      'bg-js/10 text-gray-300'}
                  `}>
                    {index + 1}
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
    </div>
  );
});

Ranking.displayName = 'Ranking'; 