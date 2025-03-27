import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FeaturesList } from './FeaturesList.component';

vi.mock('../FeatureItem/FeatureItem.component', () => ({
  FeatureItem: ({ text }: { text: string }) => <div data-testid="feature-item">{text}</div>
}));

describe('FeaturesList', () => {
  it('renders a grid of features', () => {
    const { container } = render(<FeaturesList />);
    
    const grid = container.firstChild;
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
  });
  
  it('renders all feature items with correct texts', () => {
    render(<FeaturesList />);
    
    const featureItems = screen.getAllByTestId('feature-item');
    expect(featureItems).toHaveLength(4);
    
    expect(featureItems[0]).toHaveTextContent('Interaktywne lekcje');
    expect(featureItems[1]).toHaveTextContent('Wyzwania i gry');
    expect(featureItems[2]).toHaveTextContent('Śledzenie postępów');
    expect(featureItems[3]).toHaveTextContent('Społeczność');
  });
}); 