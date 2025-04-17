import { memo } from 'react';
import { motion } from 'framer-motion';
import { ResourceCard } from './ResourceCard.component';
import { type Resource } from '../types/resource.types';
import { Helmet } from 'react-helmet';

type ResourceSectionProps = {
  title: string;
  subtitle: string;
  resources: Resource[];
  isRecommended?: boolean;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const ResourceSection = memo(
  ({ title, subtitle, resources, isRecommended }: ResourceSectionProps) => {
    return (
      <section>
        <Helmet>
          <title>Zasoby | CodeLinesJS</title>
          <meta
            name="description"
            content="Zasoby JavaScript - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku."
          />
        </Helmet>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-js mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {resources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} isRecommended={isRecommended} />
          ))}
        </motion.div>
      </section>
    );
  }
);

ResourceSection.displayName = 'ResourceSection';
