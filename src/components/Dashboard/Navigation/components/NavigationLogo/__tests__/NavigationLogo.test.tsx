import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavigationLogo } from '../NavigationLogo.component';

describe('NavigationLogo', () => {
  it('renderuje się poprawnie gdy jest rozwinięte', () => {
    render(<NavigationLogo isExpanded={true} />);
    expect(screen.getByText('CodeLinesJS')).toBeInTheDocument();
  });

  it('nie wyświetla tekstu gdy jest zwinięte', () => {
    render(<NavigationLogo isExpanded={false} />);
    expect(screen.queryByText('CodeLinesJS')).not.toBeInTheDocument();
  });

  it('zawsze wyświetla ikonę', () => {
    const { container } = render(<NavigationLogo isExpanded={false} />);
    expect(container.querySelector('.text-js')).toBeInTheDocument();
  });
}); 