import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationButton } from '../NavigationButton.component';
import { FaHome } from 'react-icons/fa';

describe('NavigationButton', () => {
  const defaultProps = {
    icon: <FaHome />,
    label: 'Test Button',
    isExpanded: true,
    onClick: vi.fn(),
  };

  it('render correctly with basic props', () => {
    render(<NavigationButton id="test" {...defaultProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('does not display label when isExpanded is false', () => {
    render(<NavigationButton id="test" {...defaultProps} isExpanded={false} />);
    expect(screen.queryByText('Test Button')).not.toBeInTheDocument();
  });

  it('onclick before click', () => {
    const onClick = vi.fn();
    render(<NavigationButton id="test" {...defaultProps} onClick={onClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('apply styles for danger variant', () => {
    render(<NavigationButton id="test" {...defaultProps} variant="danger" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-red-400');
  });
}); 