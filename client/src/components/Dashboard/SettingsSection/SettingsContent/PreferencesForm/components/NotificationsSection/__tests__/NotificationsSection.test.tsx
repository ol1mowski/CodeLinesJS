import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationsSection } from '../NotificationsSection.component';
import { UseFormRegister } from 'react-hook-form';
import { PreferencesData } from '../../../../../types/settings';

describe('NotificationsSection', () => {
  const mockRegister = vi.fn() as unknown as UseFormRegister<PreferencesData>;
  const mockOnChange = vi.fn();

  const defaultProps = {
    register: mockRegister,
    values: {
      emailNotifications: true,
      pushNotifications: false
    },
    onChange: mockOnChange
  };

  it('should render all notification options', () => {
    render(<NotificationsSection {...defaultProps} />);
    
    expect(screen.getByText('Powiadomienia')).toBeInTheDocument();
    expect(screen.getByText('Powiadomienia email')).toBeInTheDocument();
    expect(screen.getByText('Otrzymuj powiadomienia na email')).toBeInTheDocument();
  });

  it('should handle email notification change', () => {
    render(<NotificationsSection {...defaultProps} />);

    const emailCheckbox = screen.getByRole('checkbox', { 
      name: /powiadomienia email/i 
    });
    fireEvent.click(emailCheckbox);

    expect(mockOnChange).toHaveBeenCalledWith('emailNotifications', false);
  });
}); 