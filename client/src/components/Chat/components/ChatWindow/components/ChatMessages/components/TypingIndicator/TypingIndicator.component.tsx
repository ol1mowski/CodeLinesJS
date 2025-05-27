export const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-2 max-w-[80%]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="text-xs font-bold font-space">JS</span>
        </div>
        
        <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-[#f7df1e] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-[#f7df1e] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-[#f7df1e] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-xs text-gray-500 ml-1 font-space">pisze...</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 