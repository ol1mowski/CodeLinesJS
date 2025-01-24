import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileForm } from '../ProfileForm.component';
import { useProfile } from '../../../hooks/useProfile';
import { useAvatarHandling } from '../../../hooks/useAvatarHandling';
import { ToastProvider } from '../../../contexts/ToastContext';


vi.mock('../../../hooks/useProfile');
vi.mock('../../../hooks/useAvatarHandling');
vi.mock('../../../hooks/useProfileFormLogic', () => ({
  useProfileFormLogic: vi.fn().mockReturnValue({
    form: {
      register: vi.fn(),
      formState: { 
        errors: {},
        isSubmitting: false 
      },
      reset: vi.fn(),
      watch: vi.fn()
    },
    onSubmit: vi.fn(e => e.preventDefault())
  })
}));

describe('ProfileForm', () => {
  const mockUpdateAvatar = vi.fn();
  const mockUpdateProfile = vi.fn();
  const mockHandleChangeAvatar = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(useProfile).mockReturnValue({
      profile: {
        username: 'testuser',
        email: 'test@example.com',
        profile: {
          bio: 'Test bio',
          avatar: 'test-avatar.jpg'
        }
      },
      avatarUrl: 'test-avatar.jpg',
      isLoading: false,
      updateProfile: {
        mutateAsync: mockUpdateProfile,
        isPending: false
      },
      updateAvatar: {
        mutateAsync: mockUpdateAvatar,
        isPending: false
      }
    } as any);

    vi.mocked(useAvatarHandling).mockReturnValue({
      previewAvatar: null,
      handleChangeAvatar: mockHandleChangeAvatar,
      setPreviewAvatar: vi.fn()
    });
  });

  it('powinien wyrenderować formularz z danymi użytkownika', () => {
    render(
      <ToastProvider>
        <ProfileForm />
      </ToastProvider>
    );

    expect(screen.getByPlaceholderText('Wprowadź nazwę użytkownika')).toBeDefined();
    expect(screen.getByPlaceholderText('Wprowadź adres email')).toBeDefined();
    expect(screen.getByPlaceholderText('Test bio')).toBeDefined();
    expect(screen.getByRole('img', { name: /avatar/i })).toBeDefined();
  });

  it('powinien wyświetlić loader podczas ładowania', () => {
    vi.mocked(useProfile).mockReturnValue({
      profile: null,
      isLoading: true,
      updateProfile: {
        mutateAsync: mockUpdateProfile,
        isPending: false
      },
      updateAvatar: {
        mutateAsync: mockUpdateAvatar,
        isPending: false
      }
    } as any);

    render(
      <ToastProvider>
        <ProfileForm />
      </ToastProvider>
    );

    expect(screen.getByRole('status')).toBeDefined();
  });

  it('powinien obsłużyć zmianę avatara', async () => {
    render(
      <ToastProvider>
        <ProfileForm />
      </ToastProvider>
    );

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByRole('button', { name: /zmień avatar/i });
    const hiddenInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    fireEvent.click(fileInput);
    fireEvent.change(hiddenInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(mockHandleChangeAvatar).toHaveBeenCalledWith(file);
    });
  });

  it('powinien obsłużyć anulowanie zmian', () => {
    render(
      <ToastProvider>
        <ProfileForm />
      </ToastProvider>
    );

    const cancelButton = screen.getByText('Anuluj zmiany');
    fireEvent.click(cancelButton);

    expect(screen.getByText('Zmiany zostały anulowane')).toBeDefined();
  });

  it('powinien wyświetlić stan ładowania podczas zapisywania', () => {
    vi.mocked(useProfile).mockReturnValue({
      profile: {
        username: 'testuser',
        email: 'test@example.com',
        profile: {
          bio: 'Test bio',
          avatar: 'test-avatar.jpg'
        }
      },
      avatarUrl: 'test-avatar.jpg',
      isLoading: false,
      updateProfile: {
        mutateAsync: mockUpdateProfile,
        isPending: true
      },
      updateAvatar: {
        mutateAsync: mockUpdateAvatar,
        isPending: false
      }
    } as any);

    render(
      <ToastProvider>
        <ProfileForm />
      </ToastProvider>
    );

    expect(screen.getByText('Zapisywanie')).toBeDefined();
    expect(screen.getByRole('button', { name: /zapisywanie/i })).toBeDisabled();
  });
}); 