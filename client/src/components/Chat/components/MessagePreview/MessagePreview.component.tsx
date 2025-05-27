import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../../hooks/useChatState';

interface MessagePreviewProps {
  message: ChatMessage | null;
  isVisible: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const MessagePreview = ({ message, isVisible, onClose, onOpenChat }: MessagePreviewProps) => {
  console.log('MessagePreview render - isVisible:', isVisible, 'message:', message?.text?.substring(0, 30));
  
  if (!message) return null;

  const handleClick = () => {
    console.log('MessagePreview clicked - opening chat');
    onOpenChat();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.4 
          }}
          className="fixed bottom-24 right-4 md:right-6 max-w-80 md:max-w-sm z-40 cursor-pointer mx-4 md:mx-0"
          onClick={handleClick}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 text-white flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold font-space">JS</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 font-space text-sm">Asystent Kodowania</h4>
                <p className="text-xs text-gray-500 font-space">Nowa wiadomość</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('MessagePreview close button clicked');
                  onClose();
                }}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
              >
                <span className="text-gray-500 text-sm">✕</span>
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-sm text-gray-800 font-space leading-relaxed line-clamp-3">
                {message.text.length > 80 
                  ? `${message.text.substring(0, 80)}...` 
                  : message.text
                }
              </p>
            </div>

            <div className="text-xs text-gray-500 mt-2 font-space">
              {message.timestamp.toLocaleTimeString('pl-PL', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>

            <div className="text-xs text-[#f7df1e] mt-1 font-space font-bold">
              Kliknij aby otworzyć chat
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f7df1e]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="absolute -inset-1 bg-[#f7df1e] rounded-2xl opacity-20 animate-ping pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 