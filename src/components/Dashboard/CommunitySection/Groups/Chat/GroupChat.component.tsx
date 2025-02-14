import { memo, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaPaperPlane, FaSpinner, FaEdit, FaTrash, FaSmile, FaEllipsisV } from "react-icons/fa";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../../../hooks/useAuth";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
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

  const MessageBubble = ({ message, isOwnMessage }: { message: Message; isOwnMessage: boolean }) => {
    const [showActions, setShowActions] = useState(false);
    const [showReactions, setShowReactions] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`group flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''} mb-4`}
      >
        <div className="flex-shrink-0 pt-1">
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

        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-[70%]`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-400">
              {message.author.username}
            </span>
            <span className="text-xs text-gray-500">
              {format(new Date(message.createdAt), 'HH:mm, d MMM', { locale: pl })}
            </span>
          </div>

          <div className="relative group">
            <motion.div
              className={`
                px-4 py-2 rounded-2xl break-words
                ${isOwnMessage 
                  ? 'bg-js text-dark ml-auto' 
                  : 'bg-dark/50 text-gray-200'
                }
                ${editingMessageId === message._id ? 'hidden' : 'block'}
              `}
            >
              <p>{message.content}</p>
              {message.isEdited && (
                <span className="text-xs opacity-70 ml-2">(edytowano)</span>
              )}
            </motion.div>

            {/* Akcje na wiadomości */}
            <AnimatePresence>
              {showActions && isOwnMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-0 right-full mr-2 bg-dark/90 rounded-lg shadow-lg border border-js/10 p-1"
                >
                  <div className="flex gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(message)}
                      className="p-2 rounded-lg hover:bg-js/10 text-js"
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(message._id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Menu kontekstowe */}
            <button
              onClick={() => setShowActions(!showActions)}
              className={`
                absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity
                ${isOwnMessage ? 'left-0 -translate-x-full ml-2' : 'right-0 translate-x-full mr-2'}
              `}
            >
              <FaEllipsisV className="text-gray-400 hover:text-js" />
            </button>
          </div>

          {editingMessageId === message._id && (
            <form
              onSubmit={handleSubmit((data) => 
                editMessageMutation.mutate({
                  messageId: message._id,
                  content: data.message
                })
              )}
              className="w-full mt-1"
            >
              <input
                {...register("message", { required: true })}
                className="w-full bg-dark/50 rounded-lg px-3 py-1.5 text-gray-200 border border-js/10 focus:outline-none focus:border-js"
                autoFocus
              />
            </form>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10">
      <div className="p-4 border-b border-js/10">
        <h2 className="text-xl font-bold text-js">Czat grupy</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full text-center text-js hover:text-js/80 disabled:opacity-50 mb-4"
          >
            {isFetchingNextPage ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              'Załaduj starsze wiadomości'
            )}
          </button>
        )}

        <div className="space-y-2">
          {messages.map((message) => (
            <MessageBubble
              key={message._id}
              message={message}
              isOwnMessage={message.author._id === userId}
            />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit((data) => sendMessageMutation.mutate(data.message))}
        className="p-4 border-t border-js/10"
      >
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
          >
            <FaSmile />
          </motion.button>
          <input
            {...register("message", { required: true })}
            placeholder="Napisz wiadomość..."
            className="flex-1 bg-dark/50 rounded-lg px-4 py-2 text-gray-200 border border-js/10 focus:outline-none focus:border-js"
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