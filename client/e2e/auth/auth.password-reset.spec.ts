import { test, expect } from '@playwright/test';

test.describe('Authentication - Password Reset', () => {
  test.describe('Forgot Password Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/forgot-password');
    });

    test('should display forgot password form', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Forgot Password' })).toBeVisible();
      await expect(page.getByLabel('Email')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Send Reset Link' })).toBeVisible();
      await expect(page.getByText('Back to Login')).toBeVisible();
    });

    test('should show validation error for empty email', async ({ page }) => {
      await page.getByRole('button', { name: 'Send Reset Link' }).click();
      
      await expect(page.getByText('Email is required')).toBeVisible();
    });

    test('should show validation error for invalid email format', async ({ page }) => {
      await page.getByLabel('Email').fill('invalid-email');
      await page.getByRole('button', { name: 'Send Reset Link' }).click();
      
      await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    });

    test('should show error for non-existent email', async ({ page }) => {
      await page.getByLabel('Email').fill('nonexistent@example.com');
      await page.getByRole('button', { name: 'Send Reset Link' }).click();
      
      await expect(page.getByText('No user found with this email address')).toBeVisible();
    });

    test('should successfully send reset link for existing email', async ({ page }) => {
      await page.getByLabel('Email').fill('test@example.com');
      await page.getByRole('button', { name: 'Send Reset Link' }).click();
      
      await expect(page.getByText('Password reset link has been sent to your email')).toBeVisible();
    });

    test('should navigate back to login page', async ({ page }) => {
      await page.getByText('Back to Login').click();
      
      await expect(page).toHaveURL('/login');
    });
  });

  test.describe('Reset Password Page', () => {
    const validResetToken = 'valid-reset-token-123456';
    const expiredResetToken = 'expired-reset-token-123456';
    const invalidResetToken = 'invalid-reset-token-123456';

    test('should display reset password form with valid token', async ({ page }) => {
      await page.goto(`/reset-password?token=${validResetToken}`);
      
      await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
      await expect(page.getByLabel('New Password')).toBeVisible();
      await expect(page.getByLabel('Confirm New Password')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Reset Password' })).toBeVisible();
    });

    test('should show error for invalid token', async ({ page }) => {
      await page.goto(`/reset-password?token=${invalidResetToken}`);
      
      await expect(page.getByText('Invalid or expired password reset token')).toBeVisible();
      
      await expect(page).toHaveURL('/forgot-password');
    });

    test('should show error for expired token', async ({ page }) => {
      await page.goto(`/reset-password?token=${expiredResetToken}`);
      
      await expect(page.getByText('Password reset token has expired')).toBeVisible();
      
      await expect(page).toHaveURL('/forgot-password');
    });

    test('should show validation errors for empty fields', async ({ page }) => {
      await page.goto(`/reset-password?token=${validResetToken}`);
      
      await page.getByRole('button', { name: 'Reset Password' }).click();
      
      await expect(page.getByText('New Password is required')).toBeVisible();
      await expect(page.getByText('Confirm New Password is required')).toBeVisible();
    });

    test('should show validation error for password requirements', async ({ page }) => {
      await page.goto(`/reset-password?token=${validResetToken}`);
      
      await page.getByLabel('New Password').fill('weak');
      await page.getByLabel('Confirm New Password').fill('weak');
      await page.getByRole('button', { name: 'Reset Password' }).click();
      
      await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
    });

    test('should show validation error for password mismatch', async ({ page }) => {
      await page.goto(`/reset-password?token=${validResetToken}`);
      
      await page.getByLabel('New Password').fill('Password123!');
      await page.getByLabel('Confirm New Password').fill('DifferentPassword123!');
      await page.getByRole('button', { name: 'Reset Password' }).click();
      
      await expect(page.getByText('Passwords do not match')).toBeVisible();
    });

    test('should successfully reset password with valid token and data', async ({ page }) => {
      await page.goto(`/reset-password?token=${validResetToken}`);
      
      await page.getByLabel('New Password').fill('NewPassword123!');
      await page.getByLabel('Confirm New Password').fill('NewPassword123!');
      
      await page.getByRole('button', { name: 'Reset Password' }).click();
      
      await expect(page.getByText('Your password has been successfully reset')).toBeVisible();
      
      await expect(page).toHaveURL('/login');
    });
  });
}); 