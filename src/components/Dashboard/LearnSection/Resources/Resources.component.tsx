import { motion } from "framer-motion";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ResourceCard } from "./ResourceCard.component";
import { fetchResources } from "../lib/api/resources";
import { ErrorMessage } from "../components/ErrorMessage.component";
import type { Resource } from "../types/resource.types";

export const Resources = memo(() => {
  const { 
    data: resources, 
    isLoading, 
    error,
    refetch 
  } = useQuery<{ data: Resource[] }, Error>({
    queryKey: ['resources'],
    queryFn: fetchResources,
    retry: 2
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (error) {
    return (
      <ErrorMessage 
        message="Nie udało się pobrać materiałów. Spróbuj ponownie później."
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-js"></div>
      </div>
    );
  }

  const recommendedResources = resources?.data.filter(resource => resource.isRecommended) || [];
  const otherResources = resources?.data.filter(resource => !resource.isRecommended) || [];

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