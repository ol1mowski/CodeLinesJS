import { memo, useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaPaperPlane, FaSpinner, FaEdit, FaTrash, FaSmile, FaEllipsisV, FaCopy, FaFlag, FaTimes } from "react-icons/fa";
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
  const { user } = useAuth();
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
      lastPage.data.pagination.hasNextPage ? lastPage.data.pagination.page + 1 : undefined,
    initialPageParam: 1
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.message-actions-menu') && !target.closest('.message-actions-trigger')) {
        const allMessages = document.querySelectorAll('.message-bubble');
        allMessages.forEach(message => {
          const messageComponent = message as any;
          if (messageComponent.showActions) {
            messageComponent.showActions = false;
          }
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

    const handleReaction = (reaction: string) => {
      console.log('Dodano reakcję:', reaction, 'do wiadomości:', message._id);
      setShowActions(false);
    };

    const handleCopy = () => {
      navigator.clipboard.writeText(message.content);
      toast.success('Skopiowano wiadomość');
      setShowActions(false);
    };

    const handleReport = () => {
      console.log('Zgłoszono wiadomość:', message._id);
      toast.success('Wiadomość została zgłoszona');
      setShowActions(false);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          group flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''} 
          mb-6 message-bubble relative
        `}
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

        <div className={`
          flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} 
          max-w-[85%] sm:max-w-[70%]
        `}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-400">
              {message.author.username}
            </span>
            <span className="text-xs text-gray-500">
              {format(new Date(message.createdAt), 'HH:mm, d MMM', { locale: pl })}
            </span>
          </div>

          <div className="relative group w-full">
            <motion.div
              className={`
                px-4 py-3 rounded-2xl break-words relative
                ${isOwnMessage 
                  ? 'bg-js text-dark ml-auto shadow-lg' 
                  : 'bg-dark/50 text-gray-200 border border-js/10 shadow-md'
                }
                ${editingMessageId === message._id ? 'hidden' : 'block'}
              `}
            >
              <p>{message.content}</p>
              {message.isEdited && (
                <span className="text-xs opacity-70 ml-2">(edytowano)</span>
              )}
            </motion.div>

            <button
              className={`
                message-actions-trigger
                absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
                transition-opacity p-2 rounded-full hover:bg-dark/50
                ${isOwnMessage ? 'left-0 -translate-x-full ml-2' : 'right-0 translate-x-full mr-2'}
              `}
              onClick={() => setShowActions(!showActions)}
            >
              <FaEllipsisV className="text-gray-400 hover:text-js" />
            </button>

            <AnimatePresence>
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`
                    message-actions-menu
                    fixed sm:absolute top-0 left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0
                    z-50 bg-dark/95 backdrop-blur-sm rounded-lg shadow-lg border border-js/10 p-3
                    w-[90vw] sm:w-64 
                    ${isOwnMessage ? 'sm:right-full sm:mr-2' : 'sm:left-full sm:ml-2'}
                    ${isOwnMessage ? 'sm:origin-right' : 'sm:origin-left'}
                  `}
                >
                  <div className="space-y-2">
        
                    <div className="p-2 rounded-lg hover:bg-js/10">
                      <div className="text-xs text-gray-400 mb-2">Reakcje</div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '👏', '🤔'].map((emoji) => (
                          <motion.button
                            key={emoji}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleReaction(emoji)}
                            className="text-xl hover:scale-110 transition-transform p-1"
                          >
                            {emoji}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-js/10 my-2" />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCopy}
                      className="w-full p-2.5 rounded-lg hover:bg-js/10 text-gray-200 text-left text-sm flex items-center gap-2"
                    >
                      <FaCopy className="text-js" />
                      Kopiuj tekst
                    </motion.button>

                    {!isOwnMessage && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleReport}
                        className="w-full p-2.5 rounded-lg hover:bg-red-500/10 text-gray-200 text-left text-sm flex items-center gap-2"
                      >
                        <FaFlag className="text-red-500" />
                        Zgłoś wiadomość
                      </motion.button>
                    )}

                    {isOwnMessage && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleEdit(message)}
                          className="w-full p-2.5 rounded-lg hover:bg-js/10 text-gray-200 text-left text-sm flex items-center gap-2"
                        >
                          <FaEdit className="text-js" />
                          Edytuj
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            if (window.confirm('Czy na pewno chcesz usunąć tę wiadomość?')) {
                              handleDelete(message._id);
                            }
                            setShowActions(false);
                          }}
                          className="w-full p-2.5 rounded-lg hover:bg-red-500/10 text-gray-200 text-left text-sm flex items-center gap-2"
                        >
                          <FaTrash className="text-red-500" />
                          Usuń
                        </motion.button>
                      </>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowActions(false)}
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 sm:hidden
                             p-2 rounded-full bg-dark/90 text-gray-400 hover:text-js border border-js/10"
                  >
                    <FaTimes />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10">
      <div className="p-4 border-b border-js/10">
        <h2 className="text-xl font-bold text-js">Czat grupy</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pt-12">
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

        <div className="space-y-4 mt-4">
          {messages.map((message) => (
            <MessageBubble
              key={message._id}
              message={message}
              isOwnMessage={message.author._id === user?._id}
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