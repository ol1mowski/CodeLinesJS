interface CTAButton {
  text: string;
  action: () => void;
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
      <button
        onClick={primaryButton.action}
        className={`${buttonStyles.button} px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg`}
      >
        {primaryButton.text}
      </button>

      {secondaryButton && buttonStyles.secondaryButton && (
        <button
          onClick={secondaryButton.action}
          className={`${buttonStyles.secondaryButton} px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105`}
        >
          {secondaryButton.text}
        </button>
      )}
    </div>
  );
}; 