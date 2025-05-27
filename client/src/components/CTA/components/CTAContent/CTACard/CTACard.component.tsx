interface CTAButton {
  text: string;
  action: () => void;
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
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: "bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-400 text-black",
          button: "bg-[#f7df1e] hover:bg-yellow-400 text-black font-bold",
          secondaryButton: "bg-black/20 hover:bg-black/30 text-black border border-black/30"
        };
      case 'challenge':
        return {
          container: "bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white border border-red-600",
          button: "bg-red-600 hover:bg-red-500 text-white font-bold"
        };
      case 'beginner':
        return {
          container: "bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white border border-green-600",
          button: "bg-green-600 hover:bg-green-500 text-white font-bold"
        };
      case 'secondary':
        return {
          container: "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white border border-blue-600",
          button: "bg-[#f7df1e] hover:bg-yellow-400 text-black font-bold"
        };
      default:
        return {
          container: "bg-[#1a1a1a] text-white border border-gray-700",
          button: "bg-[#f7df1e] hover:bg-yellow-400 text-black font-bold"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} rounded-2xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden`}>
      <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 text-center">
        {icon}
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold font-space leading-tight">
          {title}
        </h2>
        
        <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
          {subtitle}
        </p>

        {description && (
          <p className="text-base opacity-80 max-w-2xl mx-auto">
            {description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <button
            onClick={primaryButton.action}
            className={`${styles.button} px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-lg`}
          >
            {primaryButton.text}
          </button>

          {secondaryButton && (
            <button
              onClick={secondaryButton.action}
              className={`${styles.secondaryButton} px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105`}
            >
              {secondaryButton.text}
            </button>
          )}
        </div>

        {note && (
          <p className="text-sm opacity-70 pt-4">
            {note}
          </p>
        )}

        {features && (
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {features.map((feature, index) => (
              <span
                key={index}
                className="text-sm opacity-80 bg-black/20 px-3 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}; 