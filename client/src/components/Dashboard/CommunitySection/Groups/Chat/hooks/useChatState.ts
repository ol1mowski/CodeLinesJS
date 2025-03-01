import { useState } from 'react';
import { Message } from '../../../../../../types/messages.types';
import { useMessages } from './useMessages';
import { useMessageMutations } from './useMessageMutations';
import { useMessageEditing } from './useMessageEditing';
import { useScrollToBottom } from './useScrollToBottom';
import { useForm } from 'react-hook-form';
import { useClickOutside } from './useClickOutside';

export const useChatState = (groupId: string) => {
  const { messages, hasNextPage, isFetchingNextPage, fetchNextPage } = useMessages(groupId);
  const { sendMessageMutation, editMessageMutation, deleteMessageMutation } = useMessageMutations(groupId);
  const { editingMessageId, registerEdit, startEditing, cancelEditing } = useMessageEditing();
  const { messagesEndRef } = useScrollToBottom(messages);
  const { register: registerMessage, handleSubmit: handleSubmitMessage } = useForm<{ message: string }>();
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);

  useClickOutside(() => {
    const allMessages = document.querySelectorAll('.message-bubble');
    allMessages.forEach(message => {
      const messageComponent = message as any;
      if (messageComponent.showActions) {
        messageComponent.showActions = false;
      }
    });
  }, ['message-actions-menu', 'message-actions-trigger']);

  const handleEdit = (message: Message) => {
    startEditing(message);
  };

  const handleDelete = async (messageId: string) => {
    deleteMessageMutation.mutate(messageId);
  };

  const closeDeleteModal = () => setMessageToDelete(null);
  const openDeleteModal = (message: Message) => setMessageToDelete(message);

  return {
    messages,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    editingMessageId,
    messageToDelete,
    messagesEndRef,
    registerEdit,
    registerMessage,
    handleSubmitMessage,
    handleEdit,
    handleDelete,
    openDeleteModal,
    closeDeleteModal,
    cancelEditing,
    sendMessageMutation,
    editMessageMutation
  };
}; 