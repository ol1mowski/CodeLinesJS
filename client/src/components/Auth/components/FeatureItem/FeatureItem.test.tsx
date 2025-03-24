import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeatureItem } from './FeatureItem.component';

describe('FeatureItem', () => {
  it('renders with the provided text', () => {
    const testText = 'Test Feature';
    render(<FeatureItem text={testText} />);
    
    expect(screen.getByText(`✓ ${testText}`)).toBeInTheDocument();
  });
  
  it('applies correct styling', () => {
    const { container } = render(<FeatureItem text="Styling Test" />);
    
    const featureDiv = container.firstChild;
    expect(featureDiv).toHaveClass('flex');
    expect(featureDiv).toHaveClass('items-center');
    expect(featureDiv).toHaveClass('bg-[#f7df1e]/10');
    expect(featureDiv).toHaveClass('rounded-lg');
    
    const textSpan = screen.getByText(/Styling Test/);
    expect(textSpan).toHaveClass('text-[#f7df1e]');
    expect(textSpan).toHaveClass('font-medium');
  });
  
  it('changes justification based on screen size', () => {
    const { container } = render(<FeatureItem text="Responsive Test" />);
    
    const featureDiv = container.firstChild;
    expect(featureDiv).toHaveClass('justify-center');
    expect(featureDiv).toHaveClass('md:justify-start');
  });
}); 