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

  it('renderuje się poprawnie z podstawowymi propsami', () => {
    render(<NavigationButton {...defaultProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('nie wyświetla etykiety gdy isExpanded jest false', () => {
    render(<NavigationButton {...defaultProps} isExpanded={false} />);
    expect(screen.queryByText('Test Button')).not.toBeInTheDocument();
  });

  it('wywołuje onClick po kliknięciu', () => {
    const onClick = vi.fn();
    render(<NavigationButton {...defaultProps} onClick={onClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('stosuje odpowiednie style dla wariantu danger', () => {
    render(<NavigationButton {...defaultProps} variant="danger" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-red-400');
  });
}); 