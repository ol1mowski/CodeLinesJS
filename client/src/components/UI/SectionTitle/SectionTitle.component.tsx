type SectionTitleProps = {
  title: string;
  subtitle: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export const SectionTitle = ({
  title,
  subtitle,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}: SectionTitleProps) => (
  <div className={`max-w-3xl ${className}`}>
    <h2 className={`text-4xl md:text-5xl font-bold font-space mb-4 ${titleClassName}`}>{title}</h2>
    <p className={`text-lg md:text-xl ${subtitleClassName}`}>{subtitle}</p>
  </div>
);
