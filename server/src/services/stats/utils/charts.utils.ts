import { ChartDataDTO, DailyStatsDTO, ProgressStatsDTO } from '../types.js';
import { getTodayString } from './date.utils.js';

export const initializeChartData = (): ChartDataDTO => {
  return {
    daily: [],
    progress: []
  };
};

export const initializeDailyStats = (): DailyStatsDTO => {
  return {
    date: getTodayString(),
    points: 0,
    timeSpent: 0
  };
};

export const updateDailyStats = (
  chartData: ChartDataDTO, 
  points: number = 0, 
  timeSpent: number = 0
): DailyStatsDTO => {
  const today = getTodayString();
  
  if (!chartData.daily) {
    chartData.daily = [];
  }
  
  const dailyIndex = chartData.daily.findIndex(d => d.date === today);
  
  if (dailyIndex >= 0) {
    chartData.daily[dailyIndex].points += points;
    chartData.daily[dailyIndex].timeSpent += timeSpent;
    return chartData.daily[dailyIndex];
  } else {
    const newDailyStats = {
      date: today,
      points,
      timeSpent
    };
    chartData.daily.push(newDailyStats);
    return newDailyStats;
  }
};

export const updateProgressStats = (
  chartData: ChartDataDTO, 
  name: string, 
  progress: number = 0, 
  timeSpent: number = 0
): ProgressStatsDTO => {
  if (!chartData.progress) {
    chartData.progress = [];
  }
  
  const progressIndex = chartData.progress.findIndex(p => p.name === name);
  
  if (progressIndex >= 0) {
    chartData.progress[progressIndex].progress += progress;
    chartData.progress[progressIndex].timeSpent += timeSpent;
    return chartData.progress[progressIndex];
  } else {
    const newProgressStats = {
      name,
      progress,
      timeSpent
    };
    chartData.progress.push(newProgressStats);
    return newProgressStats;
  }
}; 