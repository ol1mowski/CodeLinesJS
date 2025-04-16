import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FeaturesList } from './FeaturesList.component';

vi.mock('../FeatureItem/FeatureItem.component', () => ({
  FeatureItem: ({ text }: { text: string }) => <div data-testid="feature-item">{text}</div>
}));

describe('FeaturesList', () => {
  beforeEach(() => {
    cleanup();
  });
  
  it('renders a grid of features', () => {
    const { container } = render(<FeaturesList />);
    
    const grid = container.firstChild as HTMLElement;
    expect(grid.classList.contains('grid')).toBe(true);
    expect(grid.classList.contains('grid-cols-1')).toBe(true);
    expect(grid.classList.contains('sm:grid-cols-2')).toBe(true);
  });
  
  it('renders all feature items with correct texts', () => {
    render(<FeaturesList />);
    
    
    const expectedTexts = [
      'Interaktywne lekcje',
      'Wyzwania i gry',
      'Śledzenie postępów',
      'Społeczność'
    ];
    
    expectedTexts.forEach(text => {
      expect(screen.getByText(text)).not.toBeNull();
    });
  });
}); 