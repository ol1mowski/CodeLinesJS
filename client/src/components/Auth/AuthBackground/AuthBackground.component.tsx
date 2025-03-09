import { useRef } from "react";
import { motion } from "framer-motion";

import { useAuthBackground } from "./hooks/useAuthBackground.hook";

export const AuthBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useAuthBackground(containerRef);

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute inset-0 pointer-events-none"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </motion.div>
      
      {/* Dodatkowe efekty tła */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Górna poświata */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#f7df1e]/10 rounded-full blur-3xl"></div>
        
        {/* Dolna poświata */}
        <div className="absolute -bottom-40 -right-20 w-[30rem] h-[30rem] bg-[#f7df1e]/5 rounded-full blur-3xl"></div>
        
        {/* Środkowa poświata */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#1a1a1a]/50 rounded-full blur-3xl"></div>
        
        {/* Siatka */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/0 via-[#1a1a1a]/0 to-[#1a1a1a]/80"></div>
      </div>
    </>
  );
};