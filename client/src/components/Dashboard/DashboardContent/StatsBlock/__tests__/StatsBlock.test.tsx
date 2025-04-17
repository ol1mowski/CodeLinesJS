import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { StatsBlock } from '../StatsBlock.component';

describe('StatsBlock', () => {
  const mockStats = {
    level: 2,
    points: 500,
    streak: 5,
    lastActive: '2024-01-01T12:00:00Z',
  };

  beforeEach(() => {
    cleanup();
  });

  it('render all stats correctly', () => {
    render(<StatsBlock stats={mockStats} />);
    expect(screen.getByText('Poziom')).not.toBeNull();
    expect(screen.getByText('2')).not.toBeNull();
    expect(screen.getByText('Punkty')).not.toBeNull();
    expect(screen.getByText('500')).not.toBeNull();
    expect(screen.getByText('Seria')).not.toBeNull();
    expect(screen.getByText('5 dni')).not.toBeNull();
    expect(screen.getByText(/Ostatnia aktywność:/)).not.toBeNull();
  });

  it('display icons for each stat', () => {
    const { container } = render(<StatsBlock stats={mockStats} />);
    const icons = container.querySelectorAll('.text-js.text-2xl');
    expect(icons.length).toBeGreaterThanOrEqual(3);
  });
});
