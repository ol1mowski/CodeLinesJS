import { useQuery } from "@tanstack/react-query";
import { groupsApi } from "../api/groups/groups.api";
import { Group } from "../types/groups.types";
import { useAuth } from "../../../../hooks/useAuth";

export const useGroup = (groupId: string) => {
  const { token } = useAuth();
  return useQuery<Group, Error>({
    queryKey: ['group', groupId],
    queryFn: () => groupsApi.fetchGroup(groupId, token || ''),
    enabled: !!groupId,
  });
}; 