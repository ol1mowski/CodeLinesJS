import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ChartsService } from '../../../src/services/stats/charts.service.js';
import { DailyStatsDTO } from '../../../src/services/stats/types.js';

describe('ChartsService', () => {
  let mockUser: any;
  
  beforeEach(() => {
    mockUser = {
      stats: {
        chartData: {
          daily: [
            { date: '2023-08-01', points: 100, timeSpent: 60 },
            { date: '2023-08-02', points: 120, timeSpent: 75 }
          ],
          progress: [
            { name: 'JavaScript', progress: 75, timeSpent: 300 },
            { name: 'React', progress: 50, timeSpent: 200 }
          ]
        }
      }
    };
    
    const mockDate = new Date('2023-08-03');
    vi.spyOn(global, 'Date').mockImplementation(() => mockDate as any);
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  describe('initializeUserChartData', () => {
    it('should initialize chart data if user has no stats', () => {
      const userWithNoStats = {} as any;
      
      const result = ChartsService.initializeUserChartData(userWithNoStats);
      
      expect(userWithNoStats.stats).toBeDefined();
      expect(userWithNoStats.stats.chartData).toBeDefined();
      expect(userWithNoStats.stats.chartData.daily).toBeInstanceOf(Array);
      expect(userWithNoStats.stats.chartData.progress).toBeInstanceOf(Array);
      expect(result).toEqual(userWithNoStats.stats.chartData);
    });
    
    it('should initialize chart data if user stats has no chartData', () => {
      const userWithNoChartData = { stats: {} } as any;
      
      const result = ChartsService.initializeUserChartData(userWithNoChartData);
      
      expect(userWithNoChartData.stats.chartData).toBeDefined();
      expect(userWithNoChartData.stats.chartData.daily).toBeInstanceOf(Array);
      expect(userWithNoChartData.stats.chartData.progress).toBeInstanceOf(Array);
      expect(result).toEqual(userWithNoChartData.stats.chartData);
    });
    
    it('should return existing chart data if it exists', () => {
      const existingChartData = mockUser.stats.chartData;
      
      const result = ChartsService.initializeUserChartData(mockUser);
      
      expect(result).toBe(existingChartData);
    });
  });
  
  describe('updateUserDailyStats', () => {
    it('should add points and time to today\'s stats if entry exists', () => {
      const today = '2023-08-03';
      mockUser.stats.chartData.daily.push({ date: today, points: 50, timeSpent: 30 });
      
      const result = ChartsService.updateUserDailyStats(mockUser, 25, 15);
      
      expect(result.date).toBe(today);
      expect(result.points).toBe(75); // 50 + 25
      expect(result.timeSpent).toBe(45); // 30 + 15
      
      const todayStatsInUser = mockUser.stats.chartData.daily.find(
        (daily: DailyStatsDTO) => daily.date === today
      );
      expect(todayStatsInUser).toEqual(result);
    });
    
    it('should create today\'s stats if entry does not exist', () => {
      const today = '2023-08-03';
      
      const result = ChartsService.updateUserDailyStats(mockUser, 25, 15);
      
      expect(result.date).toBe(today);
      expect(result.points).toBe(25);
      expect(result.timeSpent).toBe(15);
      
      const todayStatsInUser = mockUser.stats.chartData.daily.find(
        (daily: DailyStatsDTO) => daily.date === today
      );
      expect(todayStatsInUser).toEqual(result);
    });
    
    it('should initialize chartData if it does not exist', () => {
      const userWithNoChartData = { stats: {} } as any;
      
      const result = ChartsService.updateUserDailyStats(userWithNoChartData, 25, 15);
      
      expect(userWithNoChartData.stats.chartData).toBeDefined();
      expect(userWithNoChartData.stats.chartData.daily).toBeInstanceOf(Array);
      expect(userWithNoChartData.stats.chartData.daily).toHaveLength(1);
      expect(userWithNoChartData.stats.chartData.daily[0]).toEqual(result);
    });
    
    it('should default to zero for points and timeSpent if not provided', () => {
      const result = ChartsService.updateUserDailyStats(mockUser);
      
      expect(result.points).toBe(0);
      expect(result.timeSpent).toBe(0);
    });
  });
  
  describe('getDailyStats', () => {
    it('should return daily stats if they exist', () => {
      const result = ChartsService.getDailyStats(mockUser);
      
      expect(result).toEqual(mockUser.stats.chartData.daily);
      expect(result).toHaveLength(2);
    });
    
    it('should return empty array if user has no daily stats', () => {
      const userWithNoDailyStats = {
        stats: {
          chartData: {}
        }
      } as any;
      
      const result = ChartsService.getDailyStats(userWithNoDailyStats);
      
      expect(result).toEqual([]);
    });
    
    it('should return empty array if user has no chartData', () => {
      const userWithNoChartData = {
        stats: {}
      } as any;
      
      const result = ChartsService.getDailyStats(userWithNoChartData);
      
      expect(result).toEqual([]);
    });
    
    it('should return empty array if user has no stats', () => {
      const userWithNoStats = {} as any;
      
      const result = ChartsService.getDailyStats(userWithNoStats);
      
      expect(result).toEqual([]);
    });
  });
  
  describe('ensureTodayStats', () => {
    it('should return existing today stats if they exist', () => {
      const today = '2023-08-03';
      const todayStats = { date: today, points: 50, timeSpent: 30 };
      mockUser.stats.chartData.daily.push(todayStats);
      
      const result = ChartsService.ensureTodayStats(mockUser);
      
      expect(result).toEqual(todayStats);
      expect(mockUser.stats.chartData.daily).toHaveLength(3);  // 2 existing + today
    });
    
    it('should create and return today stats if they do not exist', () => {
      const today = '2023-08-03';
      
      const result = ChartsService.ensureTodayStats(mockUser);
      
      expect(result.date).toBe(today);
      expect(result.points).toBe(0);
      expect(result.timeSpent).toBe(0);
      expect(mockUser.stats.chartData.daily).toHaveLength(3);  // 2 existing + today
    });
    
    it('should initialize chartData if it does not exist', () => {
      const userWithNoChartData = { stats: {} } as any;
      
      const result = ChartsService.ensureTodayStats(userWithNoChartData);
      
      expect(userWithNoChartData.stats.chartData).toBeDefined();
      expect(userWithNoChartData.stats.chartData.daily).toBeInstanceOf(Array);
      expect(userWithNoChartData.stats.chartData.daily).toHaveLength(1);
      expect(userWithNoChartData.stats.chartData.daily[0]).toEqual(result);
    });
  });
}); 