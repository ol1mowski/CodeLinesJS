import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";

export const StatsHeader = () => (
  <div className="flex items-center justify-between border-b border-js/20 pb-4">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-js/10">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-js"
        >
          <FaUsers className="w-6 h-6" />
        </motion.div>
      </div>
      <h2 className="text-2xl font-bold text-js">
        Statystyki Społeczności
      </h2>
    </div>
    <span className="text-sm text-gray-400">
      Aktywność w tym tygodniu
    </span>
  </div>
); 