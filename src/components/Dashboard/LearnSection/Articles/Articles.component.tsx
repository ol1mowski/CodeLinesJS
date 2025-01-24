import { motion } from "framer-motion";
import { memo, useState } from "react";
import { articles } from "../../mocks/articles.data";
import { ArticleCard } from "./ArticleCard.component";
import type { ArticleType } from "../../types/article.types";

export const Articles = memo(() => {
  const [selectedType, setSelectedType] = useState<ArticleType | 'all'>('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const filteredArticles = articles.filter(article => 
    selectedType === 'all' ? true : article.type === selectedType
  );

  const articleTypes: { id: ArticleType | 'all', label: string }[] = [
    { id: 'all', label: 'Wszystkie' },
    { id: 'tutorial', label: 'Tutoriale' },
    { id: 'guide', label: 'Poradniki' },
    { id: 'documentation', label: 'Dokumentacja' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-js mb-1">
            Artykuły JavaScript
          </h3>
          <p className="text-gray-400 text-sm">
            Pogłęb swoją wiedzę dzięki szczegółowym artykułom
          </p>
        </div>
        
        <div className="flex gap-2">
          {articleTypes.map(type => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                ${selectedType === type.id 
                  ? "text-js bg-js/10 border border-js/20" 
                  : "text-gray-400 hover:text-js/80 border border-transparent"
                }`}
            >
              {type.label}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </motion.div>
    </div>
  );
});

Articles.displayName = "Articles";
