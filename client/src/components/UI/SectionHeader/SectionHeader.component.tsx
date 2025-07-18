import { MobileWrapper } from '../MobileWrapper/MobileWrapper.component';
import { useMobileDetect } from '../hooks/useMobileDetect.hook';

type SectionHeaderProps = {
  badge?: string;
  title: string;
  subtitle: string;
  id?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export const SectionHeader = ({
  badge,
  title,
  subtitle,
  id,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}: SectionHeaderProps) => {
  const isMobile = useMobileDetect();

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {badge && (
        <MobileWrapper
          className="mb-2"
          motionProps={{
            initial: { opacity: 0, y: -20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            viewport: { once: true },
          }}
        >
          <div className="px-4 py-1.5 bg-[#f7df1e]/10 border border-[#f7df1e]/20 rounded-full text-[#f7df1e] font-semibold text-sm inline-block">
            {badge}
          </div>
        </MobileWrapper>
      )}

      <MobileWrapper
        className="max-w-3xl text-center px-4"
        motionProps={{
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: isMobile ? 0 : 0.1 },
          viewport: { once: true },
        }}
      >
        <h2
          id={id}
          className={`text-4xl md:text-5xl font-bold font-space mb-4 text-[#f7df1e] drop-shadow-lg ${titleClassName}`}
        >
          {title}
        </h2>
        <p className={`text-lg md:text-xl text-gray-400 ${subtitleClassName}`}>{subtitle}</p>
      </MobileWrapper>
    </div>
  );
};
