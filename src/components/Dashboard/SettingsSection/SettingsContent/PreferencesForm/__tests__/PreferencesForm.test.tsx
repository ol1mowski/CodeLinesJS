import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PreferencesForm } from '../PreferencesForm.component';
import { usePreferences } from '../../../hooks/usePreferences';
import { ToastProvider } from '../../../contexts/ToastContext';
import { usePreferencesForm } from '../../../hooks/usePreferencesForm';

vi.mock('../../../hooks/usePreferences');
vi.mock('../../../hooks/usePreferencesForm', () => ({
  usePreferencesForm: vi.fn().mockReturnValue({
    form: {
      register: vi.fn(),
      formState: { isSubmitting: false },
      watch: vi.fn().mockReturnValue({
        emailNotifications: true,
        pushNotifications: false,
        language: 'pl'
      }),
      setValue: vi.fn()
    },
    onSubmit: vi.fn()
  })
}));

describe('PreferencesForm', () => {
  const mockUpdatePreferences = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(usePreferences).mockReturnValue({
      preferences: {
        emailNotifications: true,
        pushNotifications: false,
        language: 'pl'
      },
      isLoading: false,
      updatePreferences: {
        mutateAsync: mockUpdatePreferences,
        isPending: false,
        mutate: vi.fn(),
        data: undefined,
        error: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        variables: undefined,
        status: 'idle',
        failureCount: 0,
        failureReason: null,
        reset: vi.fn()
      } as any
    });
  });

  it('powinien wyrenderować formularz z domyślnymi wartościami', () => {
    render(
      <ToastProvider>
        <PreferencesForm />
      </ToastProvider>
    );

    expect(screen.getByText('Powiadomienia')).toBeDefined();
    expect(screen.getByText('Język')).toBeDefined();
    expect(screen.getByText('Zapisz preferencje')).toBeDefined();
  });

  it('powinien wyświetlić loader podczas ładowania', () => {
    vi.mocked(usePreferences).mockReturnValue({
      preferences: undefined,
      isLoading: true,
      updatePreferences: {
        mutateAsync: mockUpdatePreferences,
        isPending: false,
        mutate: vi.fn(),
        data: undefined,
        error: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        variables: undefined,
        status: 'idle',
        failureCount: 0,
        failureReason: null,
        reset: vi.fn()
      } as any
    });

    render(
      <ToastProvider>
        <PreferencesForm />
      </ToastProvider>
    );

    expect(screen.getByRole('status')).toBeDefined();
  });
}); 