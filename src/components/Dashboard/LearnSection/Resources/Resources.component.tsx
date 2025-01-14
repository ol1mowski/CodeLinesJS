import { motion } from "framer-motion";
import { memo } from "react";
import { resources } from "../../../../mocks/resources.data";
import { ResourceCard } from "./ResourceCard.component";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const Resources = memo(() => {
  const recommendedResources = resources.filter(resource => resource.isRecommended);
  const otherResources = resources.filter(resource => !resource.isRecommended);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <section>
        <h2 className="text-xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
          Polecane Zasoby
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
          Wszystkie Zasoby
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </motion.div>
  );
});

Resources.displayName = "Resources"; 