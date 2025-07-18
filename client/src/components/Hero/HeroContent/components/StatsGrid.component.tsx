import { memo } from 'react';
import { MobileWrapper } from '../../../UI/MobileWrapper/MobileWrapper.component';
import { useMobileDetect } from '../../../UI/hooks/useMobileDetect.hook';
import { useGeneralStats } from '../hooks/useGeneralStats';

export const StatsGrid = memo(() => {
  const { stats, isLoading } = useGeneralStats();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatItem key={stat.label} {...stat} index={index} isLoading={isLoading} />
      ))}
    </div>
  );
});

type StatItemProps = {
  value: string;
  label: string;
  index: number;
  isLoading?: boolean;
};

const StatItem = memo(({ value, label, index, isLoading }: StatItemProps) => {
  const isMobile = useMobileDetect();

  return (
    <MobileWrapper
      className="text-center p-4 rounded-lg bg-black/20 border border-[#f7df1e]/10"
      motionProps={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: isMobile ? 0 : index * 0.1 },
      }}
    >

      { isLoading ? (
        <span className="animate-pulse">...</span>
      ) : (
        <>
          <p className="text-3xl md:text-4xl font-bold font-space text-[#f7df1e]">{value}</p>
          <p className="text-sm md:text-base text-gray-400 font-inter">{label}</p>
        </>
      )}

    </MobileWrapper>
  );
});

StatsGrid.displayName = 'StatsGrid';
StatItem.displayName = 'StatItem';
