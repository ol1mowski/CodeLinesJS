import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendGroupMessage, editGroupMessage, deleteGroupMessage } from "../../../api/groupMessages";

export const useMessageMutations = (groupId: string) => {
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => sendGroupMessage(groupId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
    },
    onError: () => toast.error('Nie udało się wysłać wiadomości')
  });

  const editMessageMutation = useMutation({
    mutationFn: ({ messageId, content }: { messageId: string; content: string }) =>
      editGroupMessage(groupId, messageId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
    },
    onError: () => toast.error('Nie udało się edytować wiadomości')
  });

  const deleteMessageMutation = useMutation({
    mutationFn: (messageId: string) => deleteGroupMessage(groupId, messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
      toast.success('Wiadomość została usunięta');
    },
    onError: () => toast.error('Nie udało się usunąć wiadomości')
  });

  return {
    sendMessageMutation,
    editMessageMutation,
    deleteMessageMutation
  };
}; 