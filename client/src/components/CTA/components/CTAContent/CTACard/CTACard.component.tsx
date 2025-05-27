import { CTAIcon } from './components/CTAIcon/CTAIcon.component';
import { CTAHeader } from './components/CTAHeader/CTAHeader.component';
import { CTAButtons } from './components/CTAButtons/CTAButtons.component';
import { CTAFooter } from './components/CTAFooter/CTAFooter.component';
import { useCTAStyles } from './hooks/useCTAStyles';

interface CTAButton {
  text: string;
  to: string;
}

interface CTACardProps {
  variant: 'primary' | 'secondary' | 'challenge' | 'beginner';
  icon: string;
  title: string;
  subtitle: string;
  description?: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
  note?: string;
  features?: string[];
}

export const CTACard = ({
  variant,
  icon,
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  note,
  features
}: CTACardProps) => {
  const styles = useCTAStyles(variant);

  return (
    <div className={`${styles.container} rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden`}>
      <CTAIcon icon={icon} />

      <div className="space-y-4">
        <CTAHeader 
          title={title}
          subtitle={subtitle}
          description={description}
        />

        <CTAButtons
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
          buttonStyles={{
            button: styles.button,
            secondaryButton: styles.secondaryButton
          }}
        />

        <CTAFooter 
          note={note}
          features={features}
        />
      </div>

      {/* Efekt świetlny */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}; 