import { motion } from "framer-motion";

export const LoadingScreen = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-2xl font-space text-indigo-400"
    >
      Ładowanie...
    </motion.div>
  </div>
); 