import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WarningBox } from '../WarningBox.component';
import { warningItems } from '../data/WarningBox.data';

describe('WarningBox', () => {
  it('powinien wyrenderować wszystkie elementy ostrzeżenia', () => {
    render(<WarningBox />);

    expect(screen.getByText('Usuwanie konta jest nieodwracalne')).toBeDefined();
    
    warningItems.forEach(item => {
      expect(screen.getByText(item)).toBeDefined();
    });
  });

  it('powinien mieć odpowiednią ikonę ostrzeżenia', () => {
    render(<WarningBox />);
    
    const icon = screen.getByTestId('warning-icon');
    expect(icon).toBeDefined();
    expect(icon).toHaveClass('text-red-500');
  });
}); 