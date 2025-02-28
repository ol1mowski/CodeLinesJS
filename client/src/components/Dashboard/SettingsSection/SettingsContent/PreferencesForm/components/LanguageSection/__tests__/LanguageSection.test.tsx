import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageSection } from '../LanguageSection.component';
import { UseFormRegister } from 'react-hook-form';
import { PreferencesData } from '../../../../../types/settings';

describe('LanguageSection', () => {
  const mockRegister = vi.fn() as unknown as UseFormRegister<PreferencesData>;

  it('should render the language selector', () => {
    render(<LanguageSection register={mockRegister} />);

    expect(screen.getByText('Język')).toBeDefined();
    expect(screen.getByRole('combobox')).toBeDefined();
    expect(screen.getByText('Polski')).toBeDefined();
  });

  it('should have the default language set to Polish', () => {
    render(<LanguageSection register={mockRegister} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('pl');
  });
}); 