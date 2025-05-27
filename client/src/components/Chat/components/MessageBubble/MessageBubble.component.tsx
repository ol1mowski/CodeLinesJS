import { motion, AnimatePresence } from 'framer-motion';

interface MessageBubbleProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const MessageBubble = ({ message, isVisible, onClose }: MessageBubbleProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            duration: 0.3 
          }}
          className="absolute bottom-full right-0 mb-3 max-w-64 z-[9999]"
          onClick={onClose}
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 relative cursor-pointer hover:shadow-2xl transition-shadow duration-200"
               style={{ 
                 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 25px rgba(0, 0, 0, 0.15)',
                 zIndex: 9999
               }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 text-white flex items-center justify-center">
                <span className="text-xs font-bold font-space">JS</span>
              </div>
              <span className="text-xs font-bold text-gray-800 font-space">Asystent</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="ml-auto w-4 h-4 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
              >
                <span className="text-gray-500 text-xs">✕</span>
              </button>
            </div>

            <p className="text-sm text-gray-800 font-space leading-relaxed">
              {message.length > 60 
                ? `${message.substring(0, 60)}...` 
                : message
              }
            </p>

            <div className="text-xs text-[#f7df1e] mt-1 font-space font-bold">
              Kliknij aby otworzyć
            </div>

            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" style={{ zIndex: 9999 }}></div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200 transform translate-y-px" style={{ zIndex: 9999 }}></div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f7df1e]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
            
            <div className="absolute -inset-0.5 bg-[#f7df1e] rounded-2xl opacity-10 animate-pulse pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 