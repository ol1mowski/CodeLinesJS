import { motion } from 'framer-motion';
import { useMobileDetect } from '../../../../../hooks/useMobileDetect';

type NewsCardProps = {
  id: string;
  version: string;
  title: string;
  description: string;
  category: string;
  categoryColor?: string;
  releaseDate: string;
  tags: string[];
  delay: number;
};

const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Dzisiaj';
  if (diffInDays === 1) return 'Wczoraj';
  if (diffInDays < 7) return `${diffInDays} dni temu`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} tygodni temu`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} miesięcy temu`;
  return `${Math.floor(diffInDays / 365)} lat temu`;
};

export const NewsCard = ({ 
  version, 
  title, 
  description, 
  category, 
  categoryColor = '#f7df1e',
  releaseDate,
  tags,
  delay 
}: NewsCardProps) => {
  const isMobile = useMobileDetect();

  const cardContent = (
    <div className="group cursor-pointer">
      <div className="relative bg-[#1a1a1a] border border-[#f7df1e]/20 rounded-lg mb-6 aspect-[4/3] flex items-center justify-center group-hover:border-[#f7df1e]/40 transition-all duration-300">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-[#f7df1e] font-space mb-2">
            {version}
          </div>
          <div className="text-sm text-gray-300 uppercase tracking-wider">
            {formatRelativeDate(releaseDate)}
          </div>
        </div>
        
        <div className="absolute top-4 left-4">
          <span 
            className="text-[#1a1a1a] px-3 py-1 text-sm font-bold uppercase tracking-wider font-space"
            style={{ backgroundColor: categoryColor }}
          >
            {category}
          </span>
        </div>
        
        <div 
          className="absolute bottom-4 right-4 w-4 h-4"
          style={{
            backgroundColor: categoryColor,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />
      </div>

      <h3 className="text-lg md:text-xl font-bold text-white leading-tight font-space uppercase tracking-wide group-hover:text-[#f7df1e] transition-colors duration-300 mb-4">
        {title}
      </h3>

      <p 
        className="text-gray-300 text-sm leading-relaxed mb-4 overflow-hidden"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}
      >
        {description}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-[#f7df1e]/10 text-[#f7df1e] rounded border border-[#f7df1e]/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

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