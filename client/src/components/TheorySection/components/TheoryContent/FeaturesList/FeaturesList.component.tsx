import { motion } from 'framer-motion';
import { FaBook, FaCode, FaLaptopCode } from 'react-icons/fa';
import { FeatureItem } from './FeatureItem.component';
import { useMobileDetect } from '../../../../hooks/useMobileDetect.hook';

export const FeaturesList = () => {
  const isMobile = useMobileDetect();

  const features = [
    {
      icon: <FaBook />,
      title: 'Interaktywne Lekcje',
      description:
        'Ucz się w swoim tempie dzięki przystępnie napisanym lekcjom z przykładami kodu.',
      delay: 0.2,
    },
    {
      icon: <FaCode />,
      title: 'Praktyczne Przykłady',
      description:
        'Każda koncepcja jest zilustrowana praktycznymi przykładami, które możesz uruchomić i zmodyfikować.',
      delay: 0.3,
    },
    {
      icon: <FaLaptopCode />,
      title: 'Śledzenie Postępów',
      description: 'Monitoruj swoje postępy i wracaj do lekcji, które wymagają powtórzenia.',
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
      initial={{ opacity: 0, x: -20 }}
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
