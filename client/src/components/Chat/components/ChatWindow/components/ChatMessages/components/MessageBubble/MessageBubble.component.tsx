import { ChatMessage } from '../../../../../../hooks/useChatState';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
          isUser 
            ? 'bg-gradient-to-br from-[#f7df1e] to-yellow-400 text-[#1a1a1a]' 
            : 'bg-gradient-to-br from-gray-600 to-gray-700 text-white'
        }`}>
          <span className="text-xs font-bold font-space">
            {isUser ? 'TY' : 'JS'}
          </span>
        </div>
        
        <div className={`rounded-2xl px-4 py-3 shadow-sm ${
          isUser 
            ? 'bg-gradient-to-br from-[#f7df1e] to-yellow-400 text-[#1a1a1a] rounded-br-md' 
            : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-space">
            {message.text}
          </p>
          <div className={`text-xs mt-2 font-space ${
            isUser ? 'text-[#1a1a1a]/60' : 'text-gray-500'
          }`}>
            {message.timestamp.toLocaleTimeString('pl-PL', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
}; 