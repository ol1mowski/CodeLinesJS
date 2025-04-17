import { memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type DailyChartProps = {
  data: Array<{
    date: string;
    points: number;
    challenges: number;
  }>;
};

export const DailyChart = memo(({ data }: DailyChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
        <XAxis
          dataKey="date"
          stroke="#666"
          tickLine={false}
          tick={{ fill: '#666' }}
          axisLine={{ stroke: '#333' }}
        />
        <YAxis
          stroke="#666"
          tickLine={false}
          tick={{ fill: '#666' }}
          axisLine={{ stroke: '#333' }}
          label={{
            value: 'Punkty',
            angle: -90,
            position: 'insideLeft',
            fill: '#666',
          }}
        />
        <Tooltip
          contentStyle={{
            background: '#1A1A1A',
            border: '1px solid #333',
            borderRadius: '4px',
            padding: '8px',
          }}
          labelStyle={{ color: '#666' }}
          itemStyle={{ color: '#F7DF1E' }}
        />
        <Line
          type="monotone"
          dataKey="points"
          stroke="#F7DF1E"
          strokeWidth={2}
          dot={{ fill: '#F7DF1E', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#F7DF1E' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

DailyChart.displayName = 'DailyChart';
