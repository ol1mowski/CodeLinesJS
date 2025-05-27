import { motion } from 'framer-motion';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput = ({ value, onChange, onSend, onKeyPress }: ChatInputProps) => {
  return (
    <div className="p-4 bg-white border-t border-gray-100">
      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Napisz wiadomość..."
            className="w-full resize-none rounded-xl border-0 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f7df1e] max-h-20 min-h-[44px] font-space placeholder-gray-400 transition-all duration-200 text-gray-800 bg-gray-50"
            rows={1}
            style={{ 
              height: 'auto',
              minHeight: '44px',
              maxHeight: '80px',
              color: '#374151',
              backgroundColor: '#f9fafb',
              textDecoration: 'none',
              outline: 'none',
              border: 'none'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 80) + 'px';
            }}
            spellCheck={false}
          />
        </div>
        
        <motion.button
          onClick={onSend}
          disabled={!value.trim()}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm ${
            value.trim()
              ? 'bg-gradient-to-br from-[#f7df1e] to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-[#1a1a1a] shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={value.trim() ? { scale: 1.05 } : {}}
          whileTap={value.trim() ? { scale: 0.95 } : {}}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
          </svg>
        </motion.button>
      </div>
      
      <div className="text-xs text-gray-600 mt-2 text-center font-space">
        Naciśnij <span className="font-bold text-[#f7df1e]">Enter</span> aby wysłać, <span className="font-bold text-[#f7df1e]">Shift+Enter</span> dla nowej linii
      </div>
    </div>
  );
}; 