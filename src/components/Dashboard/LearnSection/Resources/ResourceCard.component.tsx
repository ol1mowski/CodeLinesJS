import { motion } from "framer-motion";
import { memo } from "react";
import { FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { Resource } from "../../../../types/learning.types";

type ResourceCardProps = {
  resource: Resource;
};

const typeColors = {
  documentation: "from-blue-500/20 to-indigo-500/20 text-indigo-400",
  tutorial: "from-green-500/20 to-emerald-500/20 text-emerald-400",
  article: "from-purple-500/20 to-fuchsia-500/20 text-fuchsia-400"
};

const typeLabels = {
  documentation: "Dokumentacja",
  tutorial: "Tutorial",
  article: "Artykuł"
};

export const ResourceCard = memo(({ resource }: ResourceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 hover:border-indigo-500/50 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold font-space text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400 transition-all">
            {resource.title}
          </h3>
          <span className="text-sm text-gray-400">{resource.category}</span>
        </div>
        {resource.isRecommended && (
          <FaStar className="text-yellow-400 ml-2" />
        )}
      </div>

      <p className="text-gray-400 text-sm mb-4">
        {resource.description}
      </p>

      <div className="flex items-center justify-between">
        <span className={`
          px-3 py-1 rounded-full text-sm font-medium
          bg-gradient-to-r ${typeColors[resource.type]}
        `}>
          {typeLabels[resource.type]}
        </span>

        <motion.a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all"
        >
          Otwórz
          <FaExternalLinkAlt className="w-3 h-3" />
        </motion.a>
      </div>
    </motion.div>
  );
});

ResourceCard.displayName = "ResourceCard"; 