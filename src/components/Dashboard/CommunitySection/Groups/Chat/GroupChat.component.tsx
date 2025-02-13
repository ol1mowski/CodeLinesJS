import { memo, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaPaperPlane, FaSpinner, FaEdit, FaTrash } from "react-icons/fa";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { Message } from "../../../../../types/messages.types";
import {
  fetchGroupMessages,
  sendGroupMessage,
  editGroupMessage,
  deleteGroupMessage
} from "../../api/groupMessages";

type GroupChatProps = {
  groupId: string;
};

export const GroupChat = memo(({ groupId }: GroupChatProps) => {
  const { userId } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm<{ message: string }>();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ['groupMessages', groupId],
    queryFn: ({ pageParam = 1 }) => fetchGroupMessages(groupId, pageParam),
    getNextPageParam: (lastPage) => 
      lastPage.data.pagination.hasNextPage ? lastPage.data.pagination.page + 1 : undefined
  });

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => sendGroupMessage(groupId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
      reset();
    },
    onError: () => toast.error('Nie udało się wysłać wiadomości')
  });

  const editMessageMutation = useMutation({
    mutationFn: ({ messageId, content }: { messageId: string; content: string }) =>
      editGroupMessage(groupId, messageId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupMessages', groupId] });
      setEditingMessageId(null);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (data?.pages[data.pages.length - 1]?.data.messages) {
      scrollToBottom();
    }
  }, [data]);

  const messages = data?.pages.flatMap(page => page.data.messages) ?? [];

  const handleEdit = (message: Message) => {
    setEditingMessageId(message._id);
    setValue('message', message.content);
  };

  const handleDelete = async (messageId: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę wiadomość?')) {
      deleteMessageMutation.mutate(messageId);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10">
      <div className="p-4 border-b border-js/10">
        <h2 className="text-xl font-bold text-js">Czat grupy</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full text-center text-js hover:text-js/80 disabled:opacity-50"
          >
            {isFetchingNextPage ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              'Załaduj starsze wiadomości'
            )}
          </button>
        )}

        {messages.map((message) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.author._id === userId ? 'flex-row-reverse' : ''}`}
          >
            <div className="flex-shrink-0">
              {message.author.avatar ? (
                <img
                  src={message.author.avatar}
                  alt={message.author.username}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-js/20 flex items-center justify-center">
                  <span className="text-js text-sm">
                    {message.author.username[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className={`flex-1 ${message.author._id === userId ? 'text-right' : ''}`}>
              <div className="flex items-center gap-2 justify-between">
                <span className="font-medium text-gray-200">
                  {message.author.username}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span>
                  {message.author._id === userId && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(message)}
                        className="text-gray-400 hover:text-js"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(message._id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {editingMessageId === message._id ? (
                <form
                  onSubmit={handleSubmit((data) => 
                    editMessageMutation.mutate({
                      messageId: message._id,
                      content: data.message
                    })
                  )}
                  className="mt-1"
                >
                  <input
                    {...register("message", { required: true })}
                    className="w-full bg-dark/50 rounded px-2 py-1 text-gray-200"
                    autoFocus
                  />
                </form>
              ) : (
                <p className="text-gray-300 mt-1">{message.content}</p>
              )}
              {message.isEdited && (
                <span className="text-xs text-gray-500">(edytowano)</span>
              )}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit((data) => sendMessageMutation.mutate(data.message))}
        className="p-4 border-t border-js/10"
      >
        <div className="flex gap-2">
          <input
            {...register("message", { required: true })}
            placeholder="Napisz wiadomość..."
            className="flex-1 bg-dark/50 rounded-lg px-4 py-2 text-gray-200 border border-js/10 focus:outline-none focus:border-js/30"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={sendMessageMutation.isPending}
            className="px-4 py-2 bg-js text-dark rounded-lg hover:bg-js/90 transition-colors disabled:opacity-50"
          >
            {sendMessageMutation.isPending ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaPaperPlane />
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
});

GroupChat.displayName = "GroupChat"; 