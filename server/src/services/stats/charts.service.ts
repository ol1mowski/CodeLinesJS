import { IUser } from '../../types/index.d.js';
import { ChartDataDTO, DailyStatsDTO } from './types.js';
import { 
  initializeChartData, 
  updateDailyStats, 
  initializeDailyStats 
} from './utils/charts.utils.js';

export class ChartsService {
  static initializeUserChartData(user: IUser): ChartDataDTO {
    if (!user.stats) {
      user.stats = {};
    }
    
    if (!user.stats.chartData) {
      user.stats.chartData = initializeChartData();
    }
    
    return user.stats.chartData as ChartDataDTO;
  }
  
  static updateUserDailyStats(
    user: IUser, 
    points: number = 0, 
    timeSpent: number = 0
  ): DailyStatsDTO {
    const chartData = this.initializeUserChartData(user);
    return updateDailyStats(chartData, points, timeSpent);
  }
  
  static getDailyStats(user: IUser): DailyStatsDTO[] {
    if (!user.stats?.chartData?.daily) {
      return [];
    }
    
    return user.stats.chartData.daily as DailyStatsDTO[];
  }
  
  static ensureTodayStats(user: IUser): DailyStatsDTO {
    const chartData = this.initializeUserChartData(user);
    
    const today = new Date().toISOString().split('T')[0];
    const dailyIndex = chartData.daily.findIndex(d => d.date === today);
    
    if (dailyIndex >= 0) {
      return chartData.daily[dailyIndex];
    }
    
    const todayStats = initializeDailyStats();
    chartData.daily.push(todayStats);
    return todayStats;
  }
} 