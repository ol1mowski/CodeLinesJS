import { motion } from "framer-motion";

export const Logo = () => (
  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center z-50">
    <a
      href="/"
      className="text-4xl md:text-5xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-300% animate-gradient"
    >
      CodeLinesJS
    </a>
  </motion.div>
);
