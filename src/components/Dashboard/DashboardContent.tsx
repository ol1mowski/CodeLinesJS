import { useEffect } from "react";
import { useUserStats } from "../../../Hooks/useUserStats"; // Zakładam, że masz taki hook

const DashboardContent = () => {
  const { fetchUserStats } = useUserStats();

  const handlePointsEarned = () => {
    // Logika zdobywania punktów
    // Po zdobyciu punktów wywołaj fetchUserStats
    fetchUserStats();
  };

  useEffect(() => {
    // Możesz dodać logikę, aby fetchUserStats był wywoływany przy pierwszym renderze
    fetchUserStats();
  }, [fetchUserStats]);

  return (
    <div>
      {/* Twoja zawartość dashboardu */}
      <button onClick={handlePointsEarned}>Zdobądź punkty</button>
    </div>
  );
};

export default DashboardContent; 