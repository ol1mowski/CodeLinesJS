import { motion } from "framer-motion";
import { FaComments } from "react-icons/fa";

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

export const ChatAnimation = () => (
  <div className="p-6 space-y-6">
    {/* Nagłówek */}
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

    {/* Wiadomości */}
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.3 }}
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.3 + 0.2 }}
              className="p-3 rounded-lg bg-[#1a1a1a]/50 border border-[#f7df1e]/10 text-gray-300"
            >
              {msg.message}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Input */}
    <div className="flex gap-3">
      <input
        type="text"
        value="Dziękuję za pomoc! 🙏"
        disabled
        className="flex-1 bg-[#1a1a1a]/50 border border-[#f7df1e]/20 rounded-lg px-4 py-2 
                   text-[#f7df1e]/60 cursor-not-allowed select-none
                   focus:outline-none focus:border-[#f7df1e]/50"
      />
      <motion.button
        disabled
        className="px-6 py-2 rounded-lg bg-[#f7df1e]/10 text-[#f7df1e]/60 font-medium
                   cursor-not-allowed select-none"
      >
        Wyślij
      </motion.button>
    </div>
  </div>
); 