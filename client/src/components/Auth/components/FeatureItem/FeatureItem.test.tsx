import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeatureItem } from './FeatureItem.component';

describe('FeatureItem', () => {
  it('renders with the provided text', () => {
    const testText = 'Test Feature';
    render(<FeatureItem text={testText} />);

    expect(screen.getByText(testText)).not.toBeNull();
  });

  it('applies correct styling', () => {
    const { container } = render(<FeatureItem text="Styling Test" />);

    const featureDiv = container.firstChild as HTMLElement;
    expect(featureDiv.classList.contains('flex')).toBe(true);
    expect(featureDiv.classList.contains('items-start')).toBe(true);
    expect(featureDiv.classList.contains('gap-3')).toBe(true);

    const textSpan = screen.getByText(/Styling Test/) as HTMLElement;
    expect(textSpan.classList.contains('text-white')).toBe(true);
    expect(textSpan.classList.contains('font-semibold')).toBe(true);
  });

  it('changes justification based on screen size', () => {
    const { container } = render(<FeatureItem text="Responsive Test" />);

    const featureDiv = container.firstChild as HTMLElement;
    expect(featureDiv.classList.contains('justify-center')).toBe(true);
    expect(featureDiv.classList.contains('lg:justify-start')).toBe(true);
  });
});
