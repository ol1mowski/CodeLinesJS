import { motion } from 'framer-motion';
import { FaGamepad, FaTrophy, FaUsers } from 'react-icons/fa';
import { FeatureItem } from './FeatureItem.component';
import { useMobileDetect } from '../../../../../hooks/useMobileDetect';

export const FeaturesList = () => {
  const isMobile = useMobileDetect();

  const features = [
    {
      icon: <FaGamepad />,
      title: 'Interaktywne Gry',
      description:
        'Ucz się JavaScript poprzez wciągające gry, które sprawdzą Twoją wiedzę w praktyce.',
      delay: 0.2,
    },
    {
      icon: <FaTrophy />,
      title: 'Wyzwania Kodowania',
      description: 'Rozwiązuj praktyczne problemy programistyczne o różnym poziomie trudności.',
      delay: 0.3,
    },
    {
      icon: <FaUsers />,
      title: 'Rywalizacja z Innymi',
      description: 'Porównuj swoje wyniki z innymi uczestnikami i wspólnie się rozwijajcie.',
      delay: 0.4,
    },
  ];

  if (isMobile) {
    return (
      <div className="space-y-5">
        <div className="space-y-4">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-5"
    >
      <div className="space-y-4">
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={feature.delay}
          />
        ))}
      </div>
    </motion.div>
  );
};
