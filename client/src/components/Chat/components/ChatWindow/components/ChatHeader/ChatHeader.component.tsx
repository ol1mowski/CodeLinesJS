interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-[#f7df1e] to-yellow-400 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg">
          <span className="text-[#f7df1e] text-sm font-bold font-space">JS</span>
        </div>
        <div>
          <h3 className="font-bold text-[#1a1a1a] font-space text-lg">Asystent Kodowania</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-[#1a1a1a] opacity-80 font-space">W fazie rozwoju</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="w-8 h-8 rounded-full bg-[#1a1a1a]/10 hover:bg-[#1a1a1a]/20 flex items-center justify-center transition-all duration-200 group"
      >
        <span className="text-[#1a1a1a] text-lg group-hover:scale-110 transition-transform duration-200">✕</span>
      </button>
    </div>
  );
}; 