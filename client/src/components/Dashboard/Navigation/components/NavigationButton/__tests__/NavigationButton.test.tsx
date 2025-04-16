import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { NavigationButton } from '../NavigationButton.component';
import { FaHome } from 'react-icons/fa';

describe('NavigationButton', () => {
  const defaultProps = {
    icon: <FaHome />,
    label: 'Test Button',
    isExpanded: true,
    onClick: vi.fn(),
  };

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('render correctly with basic props', () => {
    render(<NavigationButton id="test" {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).not.toBeNull();
    expect(screen.getByText('Test Button')).not.toBeNull();
  });

  it('does not display label when isExpanded is false', () => {
    render(<NavigationButton id="test" {...defaultProps} isExpanded={false} />);
    expect(screen.queryByText('Test Button')).toBeNull();
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
    expect(button.classList.contains('text-red-400')).toBe(true);
  });
}); 