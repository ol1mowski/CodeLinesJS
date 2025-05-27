import { motion } from 'framer-motion';
import { useMobileDetect } from '../../../../../hooks/useMobileDetect';

export const NewsHeader = () => {
  const isMobile = useMobileDetect();

  const headerContent = (
    <div className="text-right">
      <div className="flex justify-end items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-[#f7df1e] rounded-full" />
        <div className="w-3 h-3 bg-[#f7df1e] rounded-full" />
        <div className="w-3 h-3 bg-[#f7df1e] rounded-full" />
      </div>
      
      <h2 
        id="latest-news-title"
        className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#f7df1e] font-space uppercase tracking-wider transform -skew-x-12"
        style={{
          textShadow: '2px 2px 0px rgba(26, 26, 26, 0.5)'
        }}
      >
        Co Nowego
      </h2>
    </div>
  );

  if (isMobile) {
    return headerContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {headerContent}
    </motion.div>
  );
}; 