import { useQuery } from "@tanstack/react-query";
import { groupsApi } from "../api/groups/groups.api";
import { Group } from "../types/groups.types";

export const useGroup = (groupId?: string) => {
  return useQuery<Group, Error>({
    queryKey: ['group', groupId],
    queryFn: () => groupsApi.fetchGroup(groupId!),
    enabled: !!groupId,
  });
}; 