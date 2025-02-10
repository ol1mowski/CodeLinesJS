import { memo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendGroupMessage } from "../../api/groups";
import { fetchGroupMessages } from "../../api/groups";


type GroupChatProps = {
  groupId: string;
};

export const GroupChat = memo(({ groupId }: GroupChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<{ message: string }>();

  const { data: messages, isLoading } = useQuery({
    queryKey: ['groupMessages', groupId],
    queryFn: () => fetchGroupMessages(groupId),
    refetchInterval: 5000
  });

  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => sendGroupMessage(groupId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(['groupMessages', groupId]);
      reset();
    },
    onError: () => {
      toast.error('Nie udało się wysłać wiadomości');
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10">
      {/* Nagłówek czatu */}
      <div className="p-4 border-b border-js/10">
        <h2 className="text-xl font-bold text-js">Czat grupy</h2>
      </div>

      {/* Lista wiadomości */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-js"></div>
          </div>
        ) : (
          messages?.map((message) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
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
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-200">
                    {message.author.username}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-300 mt-1">{message.content}</p>
              </div>
            </motion.div>
          ))
        )}
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
            <FaPaperPlane />
          </motion.button>
        </div>
      </form>
    </div>
  );
});

GroupChat.displayName = "GroupChat"; 