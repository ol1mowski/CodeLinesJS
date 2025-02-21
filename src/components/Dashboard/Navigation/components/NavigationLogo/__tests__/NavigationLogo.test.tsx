import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavigationLogo } from '../NavigationLogo.component';

describe('NavigationLogo', () => {
  it('render correctly when expanded', () => {
    render(<NavigationLogo isExpanded={true} />);
    expect(screen.getByText('CodeLinesJS')).toBeInTheDocument();
  });

  it('does not display text when collapsed', () => {
    render(<NavigationLogo isExpanded={false} />);
    expect(screen.queryByText('CodeLinesJS')).not.toBeInTheDocument();
  });

  it('always displays icon', () => {
    const { container } = render(<NavigationLogo isExpanded={false} />);
    expect(container.querySelector('.text-js')).toBeInTheDocument();
  });
}); 