import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { reportGroupMessage } from '../../../api/groupMessages';

export const useReportMessageMutation = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      messageId, 
      reason, 
      description 
    }: { 
      messageId: string; 
      reason: string; 
      description: string 
    }) => reportGroupMessage(groupId, messageId, { reason, description }),
    
    onSuccess: () => {
      toast.success('Wiadomość została zgłoszona');
      queryClient.invalidateQueries({ queryKey: ['messages', groupId] });
    },

    onError: (error: Error) => {
      toast.error(error.message || 'Nie udało się zgłosić wiadomości');
    }
  });
}; 