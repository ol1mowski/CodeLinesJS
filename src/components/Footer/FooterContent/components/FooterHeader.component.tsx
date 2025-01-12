import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";

export const FooterHeader = () => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-lg bg-js/10">
      <motion.div
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-js"
      >
        <FaCode className="w-6 h-6" />
      </motion.div>
    </div>
    <h2 className="text-2xl font-bold text-js">
      JavaScript Playground
    </h2>
  </div>
); 