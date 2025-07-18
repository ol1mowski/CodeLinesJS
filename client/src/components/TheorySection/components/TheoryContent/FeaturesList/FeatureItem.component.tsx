import { motion } from 'framer-motion';
import { useMobileDetect } from '../../../../UI/hooks/useMobileDetect.hook';  

type FeatureItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

export const FeatureItem = ({ icon, title, description, delay }: FeatureItemProps) => {
  const isMobile = useMobileDetect();

  if (isMobile) {
    return (
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 flex items-center justify-center text-lg bg-[#f7df1e]/10 text-[#f7df1e] rounded-lg shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="flex items-start gap-3"
    >
      <div className="w-10 h-10 flex items-center justify-center text-lg bg-[#f7df1e]/10 text-[#f7df1e] rounded-lg shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};
