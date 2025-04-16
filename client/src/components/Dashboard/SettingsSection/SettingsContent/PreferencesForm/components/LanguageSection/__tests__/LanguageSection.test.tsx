import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { LanguageSection } from '../LanguageSection.component';
import { UseFormRegister } from 'react-hook-form';
import { PreferencesData } from '../../../../../types/settings';

describe('LanguageSection', () => {
  const mockRegister = vi.fn() as unknown as UseFormRegister<PreferencesData>;

  beforeEach(() => {
    cleanup();
  });

  it('should render the language selector', () => {
    render(<LanguageSection register={mockRegister} />);

    expect(screen.getByText('Język')).not.toBeNull();
    
    const selects = screen.queryAllByRole('combobox');
    expect(selects.length).toBeGreaterThan(0);
    
    expect(screen.getByText('Polski')).not.toBeNull();
  });

  it('should have the default language set to Polish', () => {
    const { container } = render(<LanguageSection register={mockRegister} />);

    const select = container.querySelector('select') as HTMLSelectElement;
    expect(select).not.toBeNull();
    
    expect(select.value).toBe('pl');
  });
}); 