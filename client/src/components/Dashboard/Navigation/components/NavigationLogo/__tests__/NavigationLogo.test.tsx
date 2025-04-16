import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavigationLogo } from '../NavigationLogo.component';

describe('NavigationLogo', () => {
  it('render correctly when expanded', () => {
    render(<NavigationLogo isExpanded={true} />);
    expect(screen.getByText('CodeLinesJS')).not.toBeNull();
  });

  it('does not display text visibly when collapsed', () => {
    render(<NavigationLogo isExpanded={false} />);
    
    const textElement = screen.queryByText('CodeLinesJS');
    
    if (textElement) {
      const style = window.getComputedStyle(textElement);
      expect(style.opacity === '0' || style.display === 'none' || textElement.getAttribute('style')?.includes('opacity: 0')).toBeTruthy();
    }
  });

  it('always displays icon', () => {
    const { container } = render(<NavigationLogo isExpanded={false} />);
    expect(container.querySelector('.text-js')).not.toBeNull();
  });
}); 