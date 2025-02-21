import { useAuth } from "../../../../hooks/useAuth";
import { API_URL } from "../../../../config/api.config";
import { UserStats } from "../../../../types/stats.types";

export const fetchUserStats = async (): Promise<UserStats> => {
  const { token } = useAuth();
  try {
    const response = await fetch(`${API_URL}/users/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Wystąpił błąd podczas pobierania statystyk"
        );
      } catch {
        throw new Error(`Błąd ${response.status}: ${response.statusText}`);
      }
    }

    const dataParsed = await response.json();

    const data = dataParsed.data;

    if (!data || typeof data !== "object") {
      throw new Error("Otrzymano nieprawidłowe dane z serwera");
    }

    const formattedBadges =
      data.badges?.map((badge: any) => ({
        id: badge.id || badge._id || String(Math.random()),
        name: badge.name || "Odznaka",
        icon: badge.icon || "🏆",
        earnedAt: badge.earnedAt || new Date().toISOString(),
        description: badge.description || "Odznaka za osiągnięcie",
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
        categories: data.chartData?.categories || [],
      },
    };

    return stats;
  } catch (error) {
    console.error("Error fetching stats:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Wystąpił nieoczekiwany błąd podczas pobierania statystyk");
  }
};
