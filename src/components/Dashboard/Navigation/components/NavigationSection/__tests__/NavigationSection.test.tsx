import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationSection } from '../NavigationSection.component';
import { FaHome } from 'react-icons/fa';

describe('NavigationSection', () => {
  const mockItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <FaHome />,
      section: 'main' as const,
      path: '/home'
    }
  ];

  const defaultProps = {
    title: 'Test Section',
    items: mockItems,
    isExpanded: true,
    activeItem: '',
    onItemClick: vi.fn(),
    index: 0,
    isLastSection: false
  };

  it('render correctly with basic props', () => {
    render(<NavigationSection {...defaultProps} />);
    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('does not display section title when isExpanded is false', () => {
    render(<NavigationSection {...defaultProps} isExpanded={false} />);
    expect(screen.queryByText('Test Section')).not.toBeInTheDocument();
  });

  it('calls onItemClick with the correct item', () => {
    const onItemClick = vi.fn();
    render(<NavigationSection {...defaultProps} onItemClick={onItemClick} />);
    
    fireEvent.click(screen.getByText('Home'));
    expect(onItemClick).toHaveBeenCalledWith(mockItems[0]);
  });
}); 