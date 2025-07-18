import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PreferencesForm } from '../PreferencesForm.component';
import { usePreferences } from '../../../hooks/usePreferences.hook';

vi.mock('../../../hooks/usePreferences');
vi.mock('../../../hooks/usePreferencesForm', () => ({
  usePreferencesForm: vi.fn().mockReturnValue({
    form: {
      register: vi.fn(),
      formState: { isSubmitting: false },
      watch: vi.fn().mockReturnValue({
        emailNotifications: true,
        pushNotifications: false,
        language: 'pl',
      }),
      setValue: vi.fn(),
    },
    onSubmit: vi.fn(),
  }),
}));

describe('PreferencesForm', () => {
  const mockUpdatePreferences = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(usePreferences).mockReturnValue({
      preferences: {
        emailNotifications: true,
        pushNotifications: false,
        language: 'pl',
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
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
        reset: vi.fn(),
        refetch: vi.fn(),
      } as any,
    });
  });

  it('should render the form with default values', () => {
    render(<PreferencesForm />);

    expect(screen.getByText('Powiadomienia')).toBeDefined();
    expect(screen.getByText('Język')).toBeDefined();
    expect(screen.getByText('Zapisz preferencje')).toBeDefined();
  });

  it('should display loader during loading', () => {
    vi.mocked(usePreferences).mockReturnValue({
      preferences: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
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
        reset: vi.fn(),
      } as any,
    });

    render(<PreferencesForm />);

    expect(screen.getByText('Ładowanie preferencji...')).toBeDefined();
  });
});
