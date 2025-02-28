import { memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartHeader } from './components/ChartHeader.component';
import { CustomTooltip } from './components/CustomTooltip.component';
import { chartData, chartConfig } from './constants/chartData';

export const LearningChart = memo(() => (
  <div className="p-6 space-y-6">
    <ChartHeader />
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={chartConfig.colors.grid} 
          />
          <XAxis 
            dataKey="week" 
            stroke={chartConfig.colors.text}
            tick={{ fill: chartConfig.colors.text }}
          />
          <YAxis 
            stroke={chartConfig.colors.text}
            tick={{ fill: chartConfig.colors.text }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              color: '#f7df1e',
              fontFamily: "'Space Grotesk', sans-serif"
            }}
          />
          <Line
            type="monotone"
            dataKey="progress"
            name="Postęp nauki"
            stroke={chartConfig.colors.progress}
            strokeWidth={2}
            dot={{ 
              fill: chartConfig.dot.fill,
              stroke: chartConfig.colors.progress,
              strokeWidth: chartConfig.dot.strokeWidth,
              r: chartConfig.dot.r
            }}
            activeDot={{ r: chartConfig.dot.activeR }}
          />
          <Line
            type="monotone"
            dataKey="tasks"
            name="Ukończone zadania"
            stroke={chartConfig.colors.tasks}
            strokeWidth={2}
            dot={{ 
              fill: chartConfig.dot.fill,
              stroke: chartConfig.colors.tasks,
              strokeWidth: chartConfig.dot.strokeWidth,
              r: chartConfig.dot.r
            }}
            activeDot={{ r: chartConfig.dot.activeR }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
));

LearningChart.displayName = 'LearningChart'; 