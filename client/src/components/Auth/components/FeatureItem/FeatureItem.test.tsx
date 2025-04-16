import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeatureItem } from './FeatureItem.component';

describe('FeatureItem', () => {
  it('renders with the provided text', () => {
    const testText = 'Test Feature';
    render(<FeatureItem text={testText} />);
    
    expect(screen.getByText(`✓ ${testText}`)).not.toBeNull();
  });
  
  it('applies correct styling', () => {
    const { container } = render(<FeatureItem text="Styling Test" />);
    
    const featureDiv = container.firstChild as HTMLElement;
    expect(featureDiv.classList.contains('flex')).toBe(true);
    expect(featureDiv.classList.contains('items-center')).toBe(true);
    expect(featureDiv.classList.contains('bg-[#f7df1e]/10')).toBe(true);
    expect(featureDiv.classList.contains('rounded-lg')).toBe(true);
    
    const textSpan = screen.getByText(/Styling Test/) as HTMLElement;
    expect(textSpan.classList.contains('text-[#f7df1e]')).toBe(true);
    expect(textSpan.classList.contains('font-medium')).toBe(true);
  });
  
  it('changes justification based on screen size', () => {
    const { container } = render(<FeatureItem text="Responsive Test" />);
    
    const featureDiv = container.firstChild as HTMLElement;
    expect(featureDiv.classList.contains('justify-center')).toBe(true);
    expect(featureDiv.classList.contains('md:justify-start')).toBe(true);
  });
}); 