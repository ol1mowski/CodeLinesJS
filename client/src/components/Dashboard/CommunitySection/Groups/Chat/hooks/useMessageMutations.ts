import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendGroupMessage, editGroupMessage, deleteGroupMessage } from "../../../api/groupMessages";

export const useMessageMutations = (groupId: string) => {
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => {
      const promise = sendGroupMessage(groupId, content);
      toast.promise(promise, {
        loading: 'Wysyłanie wiadomości...',
        success: 'Wiadomość wysłana!',
        error: 'Nie udało się wysłać wiadomości'
      });
      return promise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
    }
  });

  const editMessageMutation = useMutation({
    mutationFn: ({ messageId, content }: { messageId: string; content: string }) => {
      const promise = editGroupMessage(groupId, messageId, content);
      toast.promise(promise, {
        loading: 'Aktualizowanie wiadomości...',
        success: 'Wiadomość zaktualizowana!',
        error: 'Nie udało się zaktualizować wiadomości'
      });
      return promise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
    }
  });

  const deleteMessageMutation = useMutation({
    mutationFn: (messageId: string) => {
      const promise = deleteGroupMessage(groupId, messageId);
      toast.promise(promise, {
        loading: 'Usuwanie wiadomości...',
        success: 'Wiadomość usunięta!',
        error: 'Nie udało się usunąć wiadomości'
      });
      return promise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
    }
  });

  return {
    sendMessageMutation,
    editMessageMutation,
    deleteMessageMutation
  };
}; 