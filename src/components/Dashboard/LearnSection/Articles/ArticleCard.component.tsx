import { memo } from "react";
import { motion } from "framer-motion";
import { FaClock, FaUser } from "react-icons/fa";
import type { Article } from "../types/article.types";

interface ArticleCardProps {
  article: Article;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const ArticleCard = memo(({ article }: ArticleCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-dark-800/50 border border-js/10 rounded-xl p-5 hover:border-js/20 transition-colors"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium
              ${article.type === 'tutorial' ? 'bg-green-500/10 text-green-400' :
                article.type === 'guide' ? 'bg-blue-500/10 text-blue-400' :
                'bg-purple-500/10 text-purple-400'}`}
            >
              {article.type === 'tutorial' ? 'Tutorial' :
               article.type === 'guide' ? 'Poradnik' : 'Dokumentacja'}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium
              ${article.difficulty === 'beginner' ? 'bg-green-500/10 text-green-400' :
                article.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                'bg-red-500/10 text-red-400'}`}
            >
              {article.difficulty === 'beginner' ? 'Podstawowy' :
               article.difficulty === 'intermediate' ? 'Średni' : 'Zaawansowany'}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-js mb-2">
            {article.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {article.description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <FaClock className="w-4 h-4" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1">
              <FaUser className="w-4 h-4" />
              {article.author.name}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-js/10 text-js text-xs font-medium rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ArticleCard.displayName = "ArticleCard"; 