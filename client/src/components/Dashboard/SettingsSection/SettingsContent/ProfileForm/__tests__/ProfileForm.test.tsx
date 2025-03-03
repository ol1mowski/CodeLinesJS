import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProfileForm } from '../ProfileForm.component';
import { useAuth } from '../../../../../../Hooks/useAuth';
import { useProfile } from '../../../hooks/useProfile';
import { toast } from 'react-hot-toast';
import { expect, vi, describe, beforeEach, afterEach, it } from 'vitest';

vi.mock('../../../../../../Hooks/useAuth');
vi.mock('../../../hooks/useProfile');
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('ProfileForm', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const mockProfile = {
    username: 'testuser',
    email: 'test@example.com',
    profile: {
      bio: 'Test bio'
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      token: 'test-token',
      isAuthenticated: true,
      isAuthChecking: false,
      user: {
        id: '1',
        _id: '1',
        username: 'testuser',
        email: 'test@example.com'
      },
      loading: false,
      error: null,
      logout: vi.fn(),
      login: vi.fn(),
      forgotPassword: vi.fn(),
      register: vi.fn(),
      loginWithGoogle: vi.fn()
    });
    vi.mocked(useProfile).mockReturnValue({
      profile: mockProfile,
      isLoading: false,
      bio: 'Test bio',
      error: null,
      updateProfile: {
        mutateAsync: vi.fn(),
        isPending: false
      } as any
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('should render the form with user data', async () => {
    render(<ProfileForm />, { wrapper });
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Wprowadź nazwę użytkownika')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Wprowadź adres email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Test bio')).toBeInTheDocument();
    });
  });

  it('should display loader during loading', () => {
    vi.mocked(useProfile).mockReturnValue({
      profile: undefined,
      isLoading: true,
      bio: '',
      error: null,
      updateProfile: {
        mutateAsync: vi.fn(),
        isPending: false
      } as any
    });

    render(<ProfileForm />, { wrapper });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should handle cancellation of changes', async () => {
    render(<ProfileForm />, { wrapper });
    
    const cancelButton = await screen.findByText(/anuluj/i);
    fireEvent.click(cancelButton);
    
    expect(toast.success).toHaveBeenCalledWith('Zmiany zostały anulowane');
  });

  it('should display loading state during saving', async () => {
    vi.mocked(useProfile).mockReturnValue({
      profile: mockProfile,
      isLoading: false,
      bio: 'Test bio',
      error: null,
      updateProfile: {
        mutateAsync: vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100))),
        isPending: true
      } as any
    });

    render(<ProfileForm />, { wrapper });
    
    const saveButton = screen.getByRole('button', { name: /zapisywanie/i });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });
}); 