import { motion } from "framer-motion";
import { memo } from "react";
import { resources } from "../../../../mocks/resources.data";
import { ResourceCard } from "./ResourceCard.component";

export const Resources = memo(() => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const recommendedResources = resources.filter(resource => resource.isRecommended);
  const otherResources = resources.filter(resource => !resource.isRecommended);

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-js mb-1">
            Polecane materiały
          </h3>
          <p className="text-gray-400 text-sm">
            Wyselekcjonowane materiały, które pomogą Ci w nauce
          </p>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {recommendedResources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              isRecommended
            />
          ))}
        </motion.div>
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-js mb-1">
            Wszystkie materiały
          </h3>
          <p className="text-gray-400 text-sm">
            Przeglądaj wszystkie dostępne materiały
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {otherResources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource}
            />
          ))}
        </motion.div>
      </section>
    </div>
  );
});

Resources.displayName = "Resources"; 