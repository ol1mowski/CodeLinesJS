import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsBlock } from '../StatsBlock.component';

describe('StatsBlock', () => {
  const mockStats = {
    level: 2,
    points: 500,
    streak: 5,
    lastActive: '2024-01-01T12:00:00Z'
  };

  it('render all stats correctly', () => {
    render(<StatsBlock stats={mockStats} />);

    expect(screen.getByText('Poziom')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Punkty')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Seria')).toBeInTheDocument();
    expect(screen.getByText('5 dni')).toBeInTheDocument();
    expect(screen.getByText(/Ostatnia aktywność:/)).toBeInTheDocument();
  });

  it('display icons for each stat', () => {
    render(<StatsBlock stats={mockStats} />);
    
    const icons = document.querySelectorAll('.text-js.text-2xl');
    expect(icons).toHaveLength(3);
  });
}); 