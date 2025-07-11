import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

interface RecommendationsCardProps {
  recommendations: string[];
  percentage: number;
}

export const RecommendationsCard: React.FC<RecommendationsCardProps> = memo(({
  recommendations,
  percentage
}) => {
  const getMainRecommendationColor = () => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 70) return 'text-js';
    return 'text-orange-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <FaStar className="text-js text-xl" />
        <h3 className="text-white text-lg font-bold">Rekomendacje</h3>
      </div>
      <div className="space-y-3 text-sm">
        {recommendations.map((recommendation, index) => (
          <p 
            key={index} 
            className={index === 0 ? getMainRecommendationColor() : 'text-gray-400'}
          >
            {recommendation}
          </p>
        ))}
      </div>
    </motion.div>
  );
});

RecommendationsCard.displayName = 'RecommendationsCard'; 