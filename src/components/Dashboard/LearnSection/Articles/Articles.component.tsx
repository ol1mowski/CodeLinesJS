import { motion } from "framer-motion";
import { memo } from "react";

export const Articles = memo(() => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-js mb-1">
          Artykuły JavaScript
        </h3>
        <p className="text-gray-400 text-sm">
          Pogłęb swoją wiedzę dzięki szczegółowym artykułom
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Tu będą komponenty ArticleCard */}
      </motion.div>
    </div>
  );
});

Articles.displayName = "Articles";
