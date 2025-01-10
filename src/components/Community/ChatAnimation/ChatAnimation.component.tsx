import { motion, useInView } from "framer-motion";
import { FaComments } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const messages = [
  {
    user: "Anna",
    avatar: "👩‍💻",
    message: "Hej! Ktoś może pomóc z Promise w JS?",
    time: "12:01"
  },
  {
    user: "Michał",
    avatar: "👨‍💻",
    message: "Jasne! Z czym dokładnie masz problem?",
    time: "12:02"
  },
  {
    user: "Anna",
    avatar: "👩‍💻",
    message: "Nie do końca rozumiem async/await...",
    time: "12:03"
  },
  {
    user: "Tomek",
    avatar: "🧑‍💻",
    message: "Mogę pokazać ci kilka przykładów!",
    time: "12:04"
  }
];

const typingText = "Dziękuję za pomoc! 🙏";

export const ChatAnimation = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  
  const [displayedMessages, setDisplayedMessages] = useState(messages.map(() => ""));
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTypingMessage, setIsTypingMessage] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (isInView) {
      setIsTypingMessage(true);
    }
  }, [isInView]);

  useEffect(() => {
    if (isTypingMessage && currentMessageIndex < messages.length) {
      const currentMessage = messages[currentMessageIndex].message;
      const currentDisplayed = displayedMessages[currentMessageIndex];
      
      if (currentDisplayed.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          const newMessages = [...displayedMessages];
          newMessages[currentMessageIndex] = currentMessage.slice(0, currentDisplayed.length + 1);
          setDisplayedMessages(newMessages);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setCurrentMessageIndex(prev => prev + 1);
        }, 500);
      }
    } else if (currentMessageIndex === messages.length && !isTypingResponse) {
      setTimeout(() => {
        setIsTypingResponse(true);
      }, 1000);
    }
  }, [isTypingMessage, currentMessageIndex, displayedMessages, isInView]);

  useEffect(() => {
    if (isTypingResponse && displayedText.length < typingText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(typingText.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (displayedText.length === typingText.length) {
      setIsTypingResponse(false);
    }
  }, [displayedText, isTypingResponse]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div ref={containerRef} className="p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[#f7df1e]/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#f7df1e]/10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[#f7df1e]"
            >
              <FaComments className="w-6 h-6" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-[#f7df1e]">
            Czat Społeczności
          </h2>
        </div>
        <span className="text-sm text-gray-400">
          Online: 42
        </span>
      </div>

      <div className="space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: displayedMessages[index].length > 0 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-10 h-10 rounded-full bg-[#f7df1e]/10 flex items-center justify-center text-xl"
            >
              {msg.avatar}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-[#f7df1e]">{msg.user}</span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#1a1a1a]/50 border border-[#f7df1e]/10 text-gray-300">
                {displayedMessages[index]}
                {currentMessageIndex === index && (
                  <span className={`ml-0.5 -mt-1 text-gray-300 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
                    |
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="flex-1 bg-[#1a1a1a]/50 border border-[#f7df1e]/20 rounded-lg px-4 py-2 
                      text-[#f7df1e]/60 cursor-not-allowed select-none relative">
          {displayedText}
          <span 
            className={`absolute ml-0.5 -mt-1 text-[#f7df1e]/60 transition-opacity duration-100
                       ${cursorVisible && isTypingResponse ? 'opacity-100' : 'opacity-0'}`}
          >
            |
          </span>
        </div>
        <motion.button
          animate={{
            opacity: isTypingResponse ? 0.3 : 0.6,
            scale: isTypingResponse ? 0.95 : 1
          }}
          disabled
          className="px-6 py-2 rounded-lg bg-[#f7df1e]/10 text-[#f7df1e]/60 font-medium
                     cursor-not-allowed select-none"
        >
          {isTypingResponse ? "Pisanie..." : "Wyślij"}
        </motion.button>
      </div>
    </div>
  );
}; 