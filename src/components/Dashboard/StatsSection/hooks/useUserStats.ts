import { useQuery } from '@tanstack/react-query';
import { type UserStats } from '../../../../types/stats.types';

const fetchUserStats = async (): Promise<UserStats> => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const response = await fetch('http://localhost:5001/api/stats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include', 
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Wystąpił błąd podczas pobierania statystyk');
      } catch {
        throw new Error(`Błąd ${response.status}: ${response.statusText}`);
      }
    }

    const dataParsed = await response.json();

    const data = dataParsed.data;

    if (!data || typeof data !== 'object') {
      throw new Error('Otrzymano nieprawidłowe dane z serwera');
    }


    const formattedBadges = data.badges?.map((badge: any) => ({
      id: badge.id || badge._id || String(Math.random()),
      name: badge.name || 'Odznaka',
      icon: badge.icon || '🏆',
      earnedAt: badge.earnedAt || new Date().toISOString(),
      description: badge.description || 'Odznaka za osiągnięcie'
    })) || [];

    const stats: UserStats = {
      level: data.level,
      experiencePoints: data.experiencePoints,
      nextLevelThreshold: data.nextLevelThreshold,
      completedChallenges: data.completedChallenges,
      currentStreak: data.currentStreak,
      bestStreak: data.bestStreak,
      averageScore: data.averageScore,
      totalTimeSpent: data.totalTimeSpent,
      badges: formattedBadges,
      unlockedFeatures: data.unlockedFeatures || [],
      chartData: {
        daily: data.chartData?.daily || [],
        categories: data.chartData?.categories || []
      }
    };


    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Wystąpił nieoczekiwany błąd podczas pobierania statystyk');
  }
};

export const useUserStats = () => {
  return useQuery<UserStats, Error>({
    queryKey: ['userStats'],
    queryFn: fetchUserStats,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('401')) return false;
      if (error instanceof Error && error.message.includes('403')) return false;
      return failureCount < 3;
    },
  });
}; 