import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { NavigationSection } from '../NavigationSection.component';
import { FaHome } from 'react-icons/fa';

describe('NavigationSection', () => {
  const mockItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <FaHome />,
      section: 'main' as const,
      path: '/home',
    },
  ];

  const defaultProps = {
    title: 'Test Section',
    items: mockItems,
    isExpanded: true,
    activeItem: '',
    onItemClick: vi.fn(),
    index: 0,
    isLastSection: false,
  };

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('render correctly with basic props', () => {
    render(<NavigationSection {...defaultProps} />);
    expect(screen.getByText('Test Section')).not.toBeNull();
    expect(screen.getByText('Home')).not.toBeNull();
  });

  it('does not display section title when isExpanded is false', () => {
    render(<NavigationSection {...defaultProps} isExpanded={false} />);
    expect(screen.queryByText('Test Section')).toBeNull();
  });

  it('calls onItemClick with the correct item', () => {
    const onItemClick = vi.fn();
    render(<NavigationSection {...defaultProps} onItemClick={onItemClick} />);

    fireEvent.click(screen.getByText('Home'));
    expect(onItemClick).toHaveBeenCalledWith(mockItems[0]);
  });
});
