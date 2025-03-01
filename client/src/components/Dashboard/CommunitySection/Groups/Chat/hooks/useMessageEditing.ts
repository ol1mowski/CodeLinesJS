import { useState } from "react";
import { Message } from "../../../../../../types/messages.types";
import { useForm } from "react-hook-form";

type EditMessageForm = {
  editedMessage: string;
};

export const useMessageEditing = () => {
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue: setEditValue,
    reset: resetEdit
  } = useForm<EditMessageForm>({
    defaultValues: {
      editedMessage: ''
    }
  });

  const startEditing = (message: Message) => {
    setEditingMessageId(message._id);
    setEditValue("editedMessage", message.content);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    resetEdit();
  };

  return {
    editingMessageId,
    registerEdit,
    handleSubmitEdit,
    startEditing,
    cancelEditing
  };
}; 