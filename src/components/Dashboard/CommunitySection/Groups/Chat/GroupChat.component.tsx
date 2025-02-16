import { memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaSpinner, FaEdit, FaTrash, FaSmile, FaEllipsisV, FaCopy, FaFlag, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "../../../../../hooks/useAuth";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Message } from "../../../../../types/messages.types";
import { useChatMessages } from "./hooks/useChatMessages";
import { useClickOutside } from "./hooks/useClickOutside";
import { messageValidators } from "./utils/messageValidators";
import { useReportMessage } from './hooks/useReportMessage';
import { ReportMessageModal } from './components/ReportMessageModal';
import { useMessageMutations } from './hooks/useMessageMutations';
import { useForm } from "react-hook-form";
import { useMessageBubble } from "./hooks/useMessageBubble";
import { MessageReactions } from './components/MessageReactions';

type GroupChatProps = {
  groupId: string;
};

export const GroupChat = memo(({ groupId }: GroupChatProps) => {
  const { user } = useAuth();
  const {
    messages,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    editingMessageId,
    messageToDelete,
    messagesEndRef,
    registerEdit,
    registerMessage,
    handleEdit,
    openDeleteModal,
    closeDeleteModal,
    cancelEditing,
    sendMessageMutation,
    editMessageMutation,
    scrollToBottom,
    handleSubmitEdit,
    handleSendMessage,
  } = useChatMessages(groupId);

  const { 
    messageToReport,
    isReportModalOpen,
    openReportModal,
    closeReportModal,
    handleReport,
    isReporting
  } = useReportMessage(groupId);

  const {
    deleteMessageMutation: messageMutationsDeleteMessageMutation
  } = useMessageMutations(groupId);

  const { handleSubmit } = useForm();

  useClickOutside(() => {
    const allMessages = document.querySelectorAll('.message-bubble');
    allMessages.forEach(message => {
      const messageComponent = message as any;
      if (messageComponent.showActions) {
        messageComponent.showActions = false;
      }
    });
  }, ['message-actions-menu', 'message-actions-trigger']);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  const AVAILABLE_REACTIONS = [
    { emoji: '👍', name: 'Kciuk w górę' },
    { emoji: '❤️', name: 'Serce' },
    { emoji: '😂', name: 'Śmiech' },
    { emoji: '😮', name: 'Zaskoczenie' },
    { emoji: '😢', name: 'Smutek' },
    { emoji: '😡', name: 'Złość' },
    { emoji: '🎉', name: 'Świętowanie' },
    { emoji: '👏', name: 'Oklaski' },
    { emoji: '🤔', name: 'Zamyślenie' }
  ];

  const MessageBubble = ({ message, isOwnMessage }: { message: Message; isOwnMessage: boolean }) => {
    const { 
      showActions, 
      menuRef, 
      buttonRef,
      toggleActions,
      handleReaction,
      isReacting,
      handleCopy,
      handleReport,
    } = useMessageBubble(
      message, 
      groupId,
      user,
      handleEdit, 
      openDeleteModal, 
      openReportModal
    );

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
            {editingMessageId === message._id ? (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                  w-full bg-dark/80 rounded-xl p-3 border border-js/20
                  ${isOwnMessage ? 'ml-auto' : ''}
                  shadow-lg backdrop-blur-sm
                `}
              >
                <form
                  onSubmit={handleSubmitEdit((formData) => {
                    editMessageMutation.mutate({
                      messageId: message._id,
                      content: formData.editedMessage
                    });
                    cancelEditing();
                  })}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <FaEdit className="text-js" />
                    Edycja wiadomości
                  </div>
                  
                  <textarea
                    {...registerEdit("editedMessage", messageValidators.required)}
                    className="w-full bg-dark/50 rounded-lg px-3 py-2 text-gray-200 
                             border border-js/10 focus:outline-none focus:border-js
                             min-h-[80px] resize-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        cancelEditing();
                      }
                    }}
                  />
                  
                  <div className="flex justify-end gap-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={cancelEditing}
                      className="px-4 py-2 rounded-lg bg-dark/50 text-gray-400 
                               hover:text-white transition-colors text-sm"
                    >
                      Anuluj (Esc)
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={editMessageMutation.isPending}
                      className="px-4 py-2 rounded-lg bg-js text-dark font-medium 
                               hover:bg-js/90 transition-colors text-sm
                               disabled:opacity-50 flex items-center gap-2"
                    >
                      {editMessageMutation.isPending ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Zapisywanie...
                        </>
                      ) : (
                        <>
                          <FaEdit />
                          Zapisz zmiany
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                className={`
                  px-4 py-3 rounded-2xl break-words relative
                  ${isOwnMessage 
                    ? 'bg-js text-dark ml-auto' 
                    : 'bg-dark/50 text-gray-200'
                  }
                `}
              >
                <p>{message.content}</p>
                {message.isEdited && (
                  <span className="text-xs opacity-70 ml-2">(edytowano)</span>
                )}
                
                {Array.isArray(message.reactions) && message.reactions.length > 0 && (
                  <div className="mt-2">
                    <MessageReactions
                      reactions={message.reactions}
                      onReactionClick={handleReaction}
                      isReacting={isReacting}
                      currentUserId={user?._id}
                    />
                  </div>
                )}
              </motion.div>
            )}

            <button
              ref={buttonRef}
              onClick={toggleActions}
              className={`
                message-actions-trigger
                absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
                transition-opacity p-2 rounded-full hover:bg-dark/50
                ${isOwnMessage ? 'left-0 -translate-x-full ml-2' : 'right-0 translate-x-full mr-2'}
              `}
            >
              <FaEllipsisV className="text-gray-400 hover:text-js" />
            </button>

            <AnimatePresence>
              {showActions && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`
                    message-actions-menu
                    absolute z-50 bg-dark/95 backdrop-blur-sm rounded-lg shadow-lg 
                    border border-js/10 p-3 w-64
                    ${isOwnMessage ? 'right-full mr-2 -top-1/2' : 'left-full ml-2 -top-1/2'}
                  `}
                >
                  <div className="space-y-2">
        
                    <div className="p-2 rounded-lg hover:bg-js/10">
                      <div className="text-xs text-gray-400 mb-2">Reakcje</div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {AVAILABLE_REACTIONS.map(({ emoji, name }) => {
                          const hasReacted = Array.isArray(message.reactions) && message.reactions.some(
                            r => r.emoji === emoji && r.userId === user?._id
                          );

                          return (
                            <motion.button
                              key={emoji}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleReaction(emoji)}
                              disabled={isReacting}
                              title={name}
                              className={`
                                text-xl p-1.5 rounded-lg transition-all
                                ${isReacting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-js/10'}
                                ${hasReacted ? 'bg-js/20' : ''}
                              `}
                            >
                              {emoji}
                            </motion.button>
                          );
                        })}
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
                        onClick={() => handleReport(message)}
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
                          onClick={() => openDeleteModal(message)}
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
                    onClick={toggleActions}
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

  const handleDeleteMessage = (messageId: string) => {
    messageMutationsDeleteMessageMutation.mutate(messageId);
  };

  return (
    <>
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
          onSubmit={handleSubmit(handleSendMessage)}
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
              {...registerMessage("message", { required: true })}
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

      <AnimatePresence>
        {messageToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark/90 rounded-xl p-6 w-full max-w-md relative"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaExclamationTriangle className="text-red-500 text-3xl" />
                <div>
                  <h2 className="text-xl font-bold text-red-500">Usuń wiadomość</h2>
                  <p className="text-gray-400 text-sm mt-1">Ta akcja jest nieodwracalna</p>
                </div>
              </div>

              <div className="bg-red-500/10 rounded-lg p-4 mb-6">
                <p className="text-gray-300 mb-2">Czy na pewno chcesz usunąć tę wiadomość?</p>
                <div className="text-gray-400 text-sm bg-dark/30 rounded-lg p-3 mt-2">
                  {messageToDelete.content}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeDeleteModal}
                  className="px-4 py-2 rounded-lg bg-dark/50 text-gray-400 hover:text-white transition-colors"
                >
                  Anuluj
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleDeleteMessage(messageToDelete._id);
                    closeDeleteModal();
                  }}
                  className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 
                           transition-colors flex items-center gap-2"
                >
                  <FaTrash className="text-sm" />
                  Usuń wiadomość
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {messageToReport && (
        <ReportMessageModal
          message={messageToReport}
          isOpen={isReportModalOpen}
          onClose={closeReportModal}
          onSubmit={handleReport}
          isReporting={isReporting}
        />
      )}
    </>
  );
});

GroupChat.displayName = "GroupChat"; 