import { useMemo } from "react";
import { useAuth } from "./useAuth";

export const useDisplayName = () => {
  const { user } = useAuth();

  const displayName = useMemo(() => {
    if (!user) return "Użytkowniku";

    return user.displayName || user.email?.split("@")[0] || "Użytkowniku";
  }, [user]);

  return displayName;
};
