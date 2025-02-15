import { useState } from "react";
import { Message } from "../../../../../../types/messages.types";
import { useForm } from "react-hook-form";

export const useMessageEditing = () => {
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState<{ id: string; content: string } | null>(null);
  
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue: setEditValue,
    reset: resetEdit
  } = useForm<{ editedMessage: string }>();

  const startEditing = (message: Message) => {
    setEditingMessageId(message._id);
    setEditMessage({ id: message._id, content: message.content });
    setEditValue("editedMessage", message.content);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditMessage(null);
    resetEdit();
  };

  return {
    editingMessageId,
    editMessage,
    registerEdit,
    handleSubmitEdit,
    startEditing,
    cancelEditing
  };
}; 