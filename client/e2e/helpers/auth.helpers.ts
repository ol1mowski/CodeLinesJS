import { Page, expect } from '@playwright/test';

/**
 * Helper functions for authentication E2E tests
 */

/**
 * Login with the provided credentials
 * @param page - Playwright page
 * @param email - User email
 * @param password - User password
 * @param rememberMe - Whether to check "Remember me" option
 */
export async function login(
  page: Page,
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<void> {
  // Navigate to login page
  await page.goto('/login');
  
  // Fill in login form
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  
  // Check "Remember me" if needed
  if (rememberMe) {
    await page.getByLabel('Remember me').check();
  }
  
  // Submit form
  await page.getByRole('button', { name: 'Login' }).click();
}

/**
 * Register a new user
 * @param page - Playwright page
 * @param username - Username
 * @param email - User email
 * @param password - User password
 * @param confirmPassword - Confirm password (defaults to same as password)
 */
export async function register(
  page: Page,
  username: string,
  email: string,
  password: string,
  confirmPassword: string = password
): Promise<void> {
  // Navigate to register page
  await page.goto('/register');
  
  // Fill in registration form
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByLabel('Confirm Password').fill(confirmPassword);
  
  // Submit form
  await page.getByRole('button', { name: 'Register' }).click();
}

/**
 * Request password reset
 * @param page - Playwright page
 * @param email - User email
 */
export async function requestPasswordReset(
  page: Page,
  email: string
): Promise<void> {
  // Navigate to forgot password page
  await page.goto('/forgot-password');
  
  // Fill in email
  await page.getByLabel('Email').fill(email);
  
  // Submit form
  await page.getByRole('button', { name: 'Send Reset Link' }).click();
}

/**
 * Reset password with token
 * @param page - Playwright page
 * @param token - Reset token
 * @param newPassword - New password
 * @param confirmNewPassword - Confirm new password (defaults to same as newPassword)
 */
export async function resetPassword(
  page: Page,
  token: string,
  newPassword: string,
  confirmNewPassword: string = newPassword
): Promise<void> {
  // Navigate to reset password page with token
  await page.goto(`/reset-password?token=${token}`);
  
  // Fill in new password form
  await page.getByLabel('New Password').fill(newPassword);
  await page.getByLabel('Confirm New Password').fill(confirmNewPassword);
  
  // Submit form
  await page.getByRole('button', { name: 'Reset Password' }).click();
}

/**
 * Logout the current user
 * @param page - Playwright page
 */
export async function logout(page: Page): Promise<void> {
  // Click on user menu/dropdown
  await page.getByRole('button', { name: 'User menu' }).click();
  
  // Click logout option
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  
  // Verify redirect to login page
  await expect(page).toHaveURL('/login');
}

/**
 * Generate a unique email for testing
 * @returns A unique email address
 */
export function generateUniqueEmail(): string {
  return `test-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;
}

/**
 * Check if user is authenticated
 * @param page - Playwright page
 * @returns Promise resolving to boolean indicating if user is authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  try {
    // Check for elements that would only be visible when authenticated
    await expect(page.getByRole('button', { name: 'User menu' })).toBeVisible({ timeout: 2000 });
    return true;
  } catch {
    return false;
  }
} 