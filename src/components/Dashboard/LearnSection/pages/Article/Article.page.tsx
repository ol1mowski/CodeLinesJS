import { motion } from "framer-motion";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { articles } from "../../mocks/articles.data";
import { FaClock, FaUser, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ArticlePage = memo(() => {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return <div>Artykuł nie został znaleziony</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark/50 backdrop-blur-sm py-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/learn" 
          className="inline-flex items-center gap-2 text-js hover:text-js/80 transition-colors mb-6"
        >
          <FaChevronLeft className="w-4 h-4" />
          Wróć do artykułów
        </Link>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-800/50 border border-js/10 rounded-xl p-6 md:p-8"
        >
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
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

              <h1 className="text-3xl font-bold text-js mb-4">
                {article.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <FaClock className="w-4 h-4" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <FaUser className="w-4 h-4" />
                  {article.author.name}
                </span>
                <span className="text-gray-500">
                  {new Date(article.publishDate).toLocaleDateString('pl-PL')}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2.5 py-1 bg-js/10 text-js text-xs font-medium rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-invert prose-js max-w-none">
              {article.content}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

ArticlePage.displayName = "ArticlePage"; 