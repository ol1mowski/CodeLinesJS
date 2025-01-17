import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Group } from '../../../../../types/groups.types';

const GROUPS_QUERY_KEY = 'groups';

const fetchGroups = async (): Promise<Group[]> => {
  const response = await fetch('http://localhost:5001/api/groups');
  if (!response.ok) {
    throw new Error('Failed to fetch groups');
  }
  return response.json();
};

const joinGroup = async (groupId: string): Promise<void> => {
  const response = await fetch(`http://localhost:5001/api/groups/${groupId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to join group');
  }
};

export const useGroups = () => {
  const queryClient = useQueryClient();

  const { data: groups, isLoading } = useQuery({
    queryKey: [GROUPS_QUERY_KEY],
    queryFn: fetchGroups,
    staleTime: 5 * 60 * 1000
  });

  const joinGroupMutation = useMutation({
    mutationFn: joinGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY] });
    }
  });

  return {
    groups,
    isLoading,
    joinGroup: joinGroupMutation.mutate
  };
}; 