import { FaGamepad, FaUsers, FaTrophy } from 'react-icons/fa';
import { useMobileDetect } from '../../../../hooks/useMobileDetect.hook';
import { FeatureCard } from './FeatureCard.component';

export const FeatureCards = () => {
  const isMobile = useMobileDetect();

  const features = [
    {
      icon: <FaGamepad />,
      title: 'Interaktywna Rozgrywka',
      subtitle: 'Prawdziwe wyzwania programistyczne',
      description: 'Rozwiązuj rzeczywiste problemy programistyczne w formie gry. Każdy poziom to nowa wyzwanie, które rozwija Twoje umiejętności.',
      delay: 0.1,
    },
    {
      icon: <FaUsers />,
      title: 'Społeczność',
      subtitle: 'Ucz się razem z innymi',
      description: 'Dołącz do społeczności programistów, dziel się rozwiązaniami i ucz się od najlepszych.',
      delay: 0.2,
    },
    {
      icon: <FaTrophy />,
      title: 'Postęp',
      subtitle: 'Śledź swoje osiągnięcia',
      description: 'System osiągnięć i rankingów motywuje do ciągłego rozwoju i doskonalenia umiejętności.',
      delay: 0.3,
    },
  ];

  return (
    <div className="space-y-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          subtitle={feature.subtitle}
          description={feature.description}
          delay={isMobile ? 0 : feature.delay}
        />
      ))}
    </div>
  );
}; 