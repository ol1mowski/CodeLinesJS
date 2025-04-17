import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BadgesGrid } from '../BadgesGrid.component';

const mockBadges = [
  {
    id: '1',
    name: 'Test Badge',
    icon: '🏆',
    earnedAt: '2024-03-20T12:00:00Z',
    description: 'Test description',
  },
];

describe('BadgesGrid', () => {
  it('renders empty state when no badges', () => {
    render(<BadgesGrid badges={[]} />);
    expect(screen.getByText('Nie zdobyto jeszcze żadnych odznak')).not.toBeNull();
  });

  it('renders badges correctly', () => {
    render(<BadgesGrid badges={mockBadges} />);
    expect(screen.getByText('Test Badge')).not.toBeNull();
    expect(screen.getByText('Test description')).not.toBeNull();
    expect(screen.getByText('🏆')).not.toBeNull();
  });
});
