import { motion } from 'framer-motion';
import { useMobileDetect } from '../../../../../hooks/useMobileDetect';

type NewsCardProps = {
  version: string;
  title: string;
  category: string;
  delay: number;
};

export const NewsCard = ({ version, title, category, delay }: NewsCardProps) => {
  const isMobile = useMobileDetect();

  const cardContent = (
    <div className="group cursor-pointer">
      <div className="relative bg-[#1a1a1a] border border-[#f7df1e]/20 rounded-lg mb-6 aspect-[4/3] flex items-center justify-center group-hover:border-[#f7df1e]/40 transition-all duration-300">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-[#f7df1e] font-space mb-2">
            {version}
          </div>
          <div className="text-sm text-gray-300 uppercase tracking-wider">
            Aktualizacja
          </div>
        </div>
        
        <div className="absolute top-4 left-4">
          <span className="bg-[#f7df1e] text-[#1a1a1a] px-3 py-1 text-sm font-bold uppercase tracking-wider font-space">
            {category}
          </span>
        </div>
        
        <div 
          className="absolute bottom-4 right-4 w-4 h-4 bg-[#f7df1e]"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />
      </div>

      <h3 className="text-lg md:text-xl font-bold text-white leading-tight font-space uppercase tracking-wide group-hover:text-[#f7df1e] transition-colors duration-300 mb-4">
        {title}
      </h3>

      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-[#f7df1e] rotate-45" />
        <div className="w-2 h-2 bg-[#f7df1e] rotate-45" />
        <div className="w-2 h-2 bg-[#f7df1e] rotate-45" />
      </div>
    </div>
  );

  if (isMobile) {
    return cardContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {cardContent}
    </motion.div>
  );
}; 