import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/fetchUser.api";
import { useAuth } from "../../../../hooks/useAuth";
const USER_PROFILE_QUERY_KEY = ["userProfile"];

export const useUserProfile = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: () => fetchUser(token),
  });
};
