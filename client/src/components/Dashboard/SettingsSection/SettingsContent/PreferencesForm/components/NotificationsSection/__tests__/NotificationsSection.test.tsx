import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
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

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should render all notification options', () => {
    
    expect(screen.getByText('Powiadomienia')).not.toBeNull();
    expect(screen.getByText('Powiadomienia email')).not.toBeNull();
    expect(screen.getByText('Otrzymuj powiadomienia na email')).not.toBeNull();
  });

  it('should handle email notification change', () => {
    render(<NotificationsSection {...defaultProps} />);

    const emailCheckboxes = screen.queryAllByRole('checkbox');
    expect(emailCheckboxes.length).toBeGreaterThan(0);
    
    const emailCheckbox = emailCheckboxes[0];
    fireEvent.click(emailCheckbox);

    expect(mockOnChange).toHaveBeenCalledWith('emailNotifications', false);
  });
}); 