import { Link } from 'react-router-dom';

interface CTAButton {
  text: string;
  to: string;
}

interface CTAButtonsProps {
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
  buttonStyles: {
    button: string;
    secondaryButton?: string;
  };
}

export const CTAButtons = ({ primaryButton, secondaryButton, buttonStyles }: CTAButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
      <Link
        to={primaryButton.to}
        className={`${buttonStyles.button} px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg inline-block text-center`}
      >
        {primaryButton.text}
      </Link>

      {secondaryButton && buttonStyles.secondaryButton && (
        <Link
          to={secondaryButton.to}
          className={`${buttonStyles.secondaryButton} px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 inline-block text-center`}
        >
          {secondaryButton.text}
        </Link>
      )}
    </div>
  );
}; 