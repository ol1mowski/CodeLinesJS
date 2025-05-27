interface CTAHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
}

export const CTAHeader = ({ title, subtitle, description }: CTAHeaderProps) => {
  return (
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
    </div>
  );
}; 