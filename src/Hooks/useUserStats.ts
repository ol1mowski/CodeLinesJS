import { useState, useCallback } from "react";

export const useUserStats = () => {
  const [userStats, setUserStats] = useState({
    lessonPoints: 0,
    gamePoints: 0,
  });

  const fetchUserStats = useCallback(async () => {
    // Logika fetchowania statystyk użytkownika
    const response = await fetch("/api/user/stats");
    const data = await response.json();
    setUserStats(data);
  }, []);

  return { userStats, fetchUserStats };
}; 