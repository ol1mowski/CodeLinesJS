import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthWelcomeContent } from './AuthWelcomeContent.component';

// Mock dla komponentu FeaturesList
vi.mock('../FeaturesList/FeaturesList.component', () => ({
  FeaturesList: () => <div data-testid="features-list">Lista funkcji</div>
}));

describe('AuthWelcomeContent', () => {
  it('renders heading with JavaScript highlight', () => {
    render(<AuthWelcomeContent />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Odkryj JavaScript w nowy sposób');
    
    const jsHighlight = heading.querySelector('span');
    expect(jsHighlight).toHaveClass('text-[#f7df1e]');
  });
  
  it('renders introduction paragraph', () => {
    render(<AuthWelcomeContent />);
    
    const paragraph = screen.getByText(/Ucz się, programuj i baw się jednocześnie/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('text-gray-300');
  });
  
  it('renders FeaturesList component', () => {
    render(<AuthWelcomeContent />);
    
    expect(screen.getByTestId('features-list')).toBeInTheDocument();
  });
}); 