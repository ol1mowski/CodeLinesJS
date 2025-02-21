import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/fetchUser.api";
import { useAuth } from "../../../../hooks/useAuth";
export const useUserProfile = () => {
  const { token } = useAuth();
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => fetchUser(token),
  });
};
