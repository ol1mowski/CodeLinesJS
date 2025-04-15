import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendGroupMessage, editGroupMessage, deleteGroupMessage } from "../../../api/groupMessages";

export const useMessageMutations = (groupId: string) => {
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => {
      return sendGroupMessage(groupId, content);
    },
    onMutate: () => {
      toast.loading('Wysyłanie wiadomości...', { id: 'send-message' });
    },
    onSuccess: () => {
      toast.success('Wiadomość wysłana!', { id: 'send-message' });
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Nie udało się wysłać wiadomości', { id: 'send-message' });
    }
  });

  const editMessageMutation = useMutation({
    mutationFn: ({ messageId, content }: { messageId: string; content: string }) => {
      return editGroupMessage(groupId, messageId, content);
    },
    onMutate: () => {
      toast.loading('Aktualizowanie wiadomości...', { id: 'edit-message' });
    },
    onSuccess: () => {
      toast.success('Wiadomość zaktualizowana!', { id: 'edit-message' });
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Nie udało się zaktualizować wiadomości', { id: 'edit-message' });
    }
  });

  const deleteMessageMutation = useMutation({
    mutationFn: (messageId: string) => {
      return deleteGroupMessage(groupId, messageId);
    },
    onMutate: () => {
      toast.loading('Usuwanie wiadomości...', { id: 'delete-message' });
    },
    onSuccess: () => {
      toast.success('Wiadomość usunięta!', { id: 'delete-message' });
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Nie udało się usunąć wiadomości', { id: 'delete-message' });
    }
  });

  return {
    sendMessageMutation,
    editMessageMutation,
    deleteMessageMutation
  };
}; 