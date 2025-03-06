import { useRef } from "react";
import { motion } from "framer-motion";

import { useAuthBackground } from "./hooks/useAuthBackground.hook";


export const AuthBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useAuthBackground(containerRef);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      className="absolute inset-0 pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
}; 