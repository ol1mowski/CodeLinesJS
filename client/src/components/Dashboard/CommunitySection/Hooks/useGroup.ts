import { useQuery } from "@tanstack/react-query";
import { groupsApi } from "../api/groups/groups.api";
import { Group } from "../types/groups.types";
import { useAuth } from "../../../../hooks/useAuth";

export const useGroup = (groupId: string) => {
  const { token } = useAuth();
  
  return useQuery<Group, Error>({
    queryKey: ['group', groupId],
    queryFn: async () => {
  
      if (!groupId) {
        throw new Error('Wymagane ID grupy');
      }
      if (!token) {
        throw new Error('Wymagane uwierzytelnienie');
      }
      
      try {
        const data = await groupsApi.fetchGroup(groupId, token);
        return data;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!groupId && !!token,
    retry: 1,
    staleTime: 60000, // Dane są świeże przez 1 minutę
  });
}; 