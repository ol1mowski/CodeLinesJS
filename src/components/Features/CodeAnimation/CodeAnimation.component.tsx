import {useRef } from "react";
import { motion } from "framer-motion";

import { useCodeAnimation } from "./useCodeAnimation.hook";

export const CodeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useCodeAnimation(containerRef);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full xl:w-1/2 aspect-square relative"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
}; 