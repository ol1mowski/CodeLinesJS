import { memo } from "react";
import { motion } from "framer-motion";

export const LoadingFallback = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center p-8"
    >
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-t-indigo-500 rounded-full"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );
});

LoadingFallback.displayName = "LoadingFallback"; 