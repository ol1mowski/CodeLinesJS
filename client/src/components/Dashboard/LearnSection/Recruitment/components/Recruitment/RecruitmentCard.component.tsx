import { memo } from 'react';
import { motion } from 'framer-motion';
import type { RecruitmentSection } from '../../types/recruitment.types';

type RecruitmentCardProps = {
  section: RecruitmentSection;
  variants: any;
  onClick?: () => void;
};

export const RecruitmentCard = memo(({ section, variants, onClick }: RecruitmentCardProps) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="bg-dark-700/50 border border-js/10 rounded-xl p-6 hover:border-js/20 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-js/10 border border-js/20">
          <section.icon className="w-6 h-6 text-js" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-js transition-colors">
            {section.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {section.description}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">Co znajdziesz w tej sekcji:</h4>
        <ul className="space-y-2">
          {section.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-1.5 h-1.5 bg-js rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Status:</span>
          <span className={`text-xs px-2 py-1 rounded border ${
            section.isAvailable 
              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
              : 'bg-js/10 text-js border-js/20'
          }`}>
            {section.isAvailable ? 'Dostępne' : 'Wkrótce dostępne'}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

RecruitmentCard.displayName = 'RecruitmentCard'; 