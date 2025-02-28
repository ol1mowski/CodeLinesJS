import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendGroupMessage } from '../../../api/groupMessages';
import toast from 'react-hot-toast';

export const useMessageForm = (groupId: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset
  } = useForm<{ message: string }>();

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => sendGroupMessage(groupId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
      reset();
      onSuccess?.();
    },
    onError: () => toast.error('Nie udało się wysłać wiadomości')
  });

  const onSubmit = handleSubmit((data) => sendMessageMutation.mutate(data.message));

  return {
    register,
    onSubmit,
    isSubmitting: sendMessageMutation.isPending
  };
}; 