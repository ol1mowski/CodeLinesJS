import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../../config/api.config";

const USER_PROFILE_QUERY_KEY = ["userProfile"];

export const useUserProfile = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: async () => {
      const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Błąd pobierania profilu");
      return response.json();
    },
  });
};
