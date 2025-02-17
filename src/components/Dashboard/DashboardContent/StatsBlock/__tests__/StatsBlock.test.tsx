import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsBlock } from '../StatsBlock.component';

vi.mock('../hooks/useDateFormat', () => ({
  useDateFormat: () => vi.fn(() => '01 Sty, 12:00')
}));

describe('StatsBlock', () => {
  const mockStats = {
    completedChallenges: 10,
    totalPoints: 500,
    streak: 5,
    lastActive: '2024-01-01T12:00:00Z'
  };

  it('render all stats correctly', () => {
    render(<StatsBlock stats={mockStats} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('5 dni')).toBeInTheDocument();
    

    expect(screen.getByText('Ukończone Wyzwania')).toBeInTheDocument();
    expect(screen.getByText('Punkty')).toBeInTheDocument();
    expect(screen.getByText('Seria')).toBeInTheDocument();
    

    expect(screen.getByText(/Ostatnia aktywność:/)).toBeInTheDocument();
  });

  it('display icons for each stat', () => {
    render(<StatsBlock stats={mockStats} />);
    
    const icons = document.querySelectorAll('.text-js.text-2xl');
    expect(icons).toHaveLength(3);
  });
}); 