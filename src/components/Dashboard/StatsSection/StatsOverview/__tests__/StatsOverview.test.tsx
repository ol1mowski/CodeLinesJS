import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsOverview } from '../StatsOverview.component';
import { useUserStats } from '../../hooks/useUserStats';

vi.mock('../../hooks/useUserStats');

const mockStats = {
  level: 5,
  experiencePoints: 1500,
  nextLevelThreshold: 2000,
  completedChallenges: 25,
  currentStreak: 7,
  bestStreak: 14,
  averageScore: 85,
  totalTimeSpent: 360,
  badges: [
    {
      id: '1',
      name: 'First Challenge',
      icon: '🏆',
      earnedAt: '2024-03-20T12:00:00Z',
      description: 'Test badge'
    }
  ],
  unlockedFeatures: [],
  chartData: { daily: [], categories: [] }
};

describe('StatsOverview', () => {
  beforeEach(() => {
    (useUserStats as Mock).mockReset();
  });

  it('renders loading state', () => {
    (useUserStats as Mock).mockReturnValue({ isLoading: true });
    render(<StatsOverview stats={mockStats} isLoading={true} />);
    
    const loadingElement = screen.getByRole('status', { 
      name: /ładowanie strony/i 
    });
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useUserStats as Mock).mockReturnValue({ 
      error: new Error('Test error'),
      isLoading: false 
    });
    render(<StatsOverview stats={mockStats} isLoading={false} />);
    expect(screen.getByText(/Wystąpił błąd/)).toBeInTheDocument();
  });

  it('renders stats correctly', () => {
    (useUserStats as Mock).mockReturnValue({ 
      data: mockStats,
      isLoading: false 
    });
    render(<StatsOverview stats={mockStats} isLoading={false} />);
    
    expect(screen.getByText('Poziom 5')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument(); 
    expect(screen.getByText('7 dni')).toBeInTheDocument(); 
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('6h 0m')).toBeInTheDocument();
  });
}); 