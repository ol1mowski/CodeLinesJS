import { memo } from 'react';
import { DailyChart } from './DailyChart.component';
import { LoadingScreen } from '../../../UI/LoadingScreen/LoadingScreen.component';

type StatsChartsProps = {
  data?: {
    daily: Array<{
      date: string;
      points: number;
      challenges: number;
    }>;
  };
  isLoading: boolean;
};

export const StatsCharts = memo(({ data, isLoading }: StatsChartsProps) => {

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="hidden md:flex flex-col gap-6 h-full">
      <div className="bg-dark/50 rounded-lg p-6 flex-1">
        <h3 className="text-xl font-bold text-js mb-6">Aktywność</h3>
        <div className="h-[300px]">
          <DailyChart data={data.daily} />
        </div>
      </div>
    </div>
  );
});

StatsCharts.displayName = 'StatsCharts';
