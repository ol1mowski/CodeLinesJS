import { motion } from 'framer-motion';
import { useMobileDetect } from '../../../../hooks/useMobileDetect.hook';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  delay: number;
};

export const FeatureCard = ({ icon, title, subtitle, description, delay }: FeatureCardProps) => {
  const isMobile = useMobileDetect();

  const cardContent = (
    <div className="bg-black/20 border border-[#f7df1e]/10 rounded-xl p-6 hover:border-[#f7df1e]/20 transition-all duration-300 hover:bg-black/30 group">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#f7df1e]/10 rounded-lg flex items-center justify-center text-[#f7df1e] text-xl shrink-0 group-hover:bg-[#f7df1e]/20 transition-all duration-300">
          {icon}
        </div>

        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-[#f7df1e] mb-1 font-space">
            {title}
          </h3>

          <p className="text-sm text-gray-300 mb-3 font-medium">
            {subtitle}
          </p>

          <p className="text-gray-400 leading-relaxed text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return cardContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="h-full"
    >
      {cardContent}
    </motion.div>
  );
}; 