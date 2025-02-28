import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WarningBox } from '../WarningBox.component';
import { warningItems } from '../data/WarningBox.data';

describe('WarningBox', () => {
  it('should render all warning elements', () => {
    render(<WarningBox />);

    expect(screen.getByText('Usuwanie konta jest nieodwracalne')).toBeInTheDocument();
    
    warningItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('should have the correct warning icon', () => {
    render(<WarningBox />);
    
    const icon = screen.getByTestId('warning-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-red-500');
  });

  it('should have correct accessibility attributes', () => {
    render(<WarningBox />);
    
    const warningSection = screen.getByRole('alert');
    expect(warningSection).toBeInTheDocument();
    expect(warningSection).toHaveAttribute('aria-label', 'Ostrzeżenie o usuwaniu konta');
  });

  it('should render with proper styling', () => {
    render(<WarningBox />);
    
    const container = screen.getByRole('alert');
    expect(container).toHaveClass('bg-red-500/10', 'border-red-500');
  });
}); 