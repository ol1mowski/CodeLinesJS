import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMessageReaction } from '../../../api/groupMessages';
import toast from 'react-hot-toast';

type ReactionMutationParams = {
  messageId: string;
  reaction: string;
  action: 'add' | 'remove';
};

export const useReactionMutation = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, reaction, action }: ReactionMutationParams) => 
      addMessageReaction(groupId, messageId, reaction, action),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', groupId] });
    },

    onError: (error: Error) => {
      toast.error(error.message || 'Nie udało się dodać reakcji');
    }
  });
}; 