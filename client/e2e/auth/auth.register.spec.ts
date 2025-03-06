import { test, expect } from '@playwright/test';

test.describe('Authentication - Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('should display registration form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByLabel('Confirm Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
    await expect(page.getByText('Already have an account? Login')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Register' }).click();
    
    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
    await expect(page.getByText('Confirm Password is required')).toBeVisible();
  });

  test('should show validation error for invalid email format', async ({ page }) => {
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').fill('Password123!');
    await page.getByLabel('Confirm Password').fill('Password123!');
    await page.getByRole('button', { name: 'Register' }).click();
    
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });

  test('should show validation error for password requirements', async ({ page }) => {
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('weak');
    await page.getByLabel('Confirm Password').fill('weak');
    await page.getByRole('button', { name: 'Register' }).click();
    
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
  });

  test('should show validation error for password mismatch', async ({ page }) => {
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Password123!');
    await page.getByLabel('Confirm Password').fill('DifferentPassword123!');
    await page.getByRole('button', { name: 'Register' }).click();
    
    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  test('should show error for existing email', async ({ page }) => {
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Email').fill('existing@example.com');
    await page.getByLabel('Password').fill('Password123!');
    await page.getByLabel('Confirm Password').fill('Password123!');
    await page.getByRole('button', { name: 'Register' }).click();
    
    await expect(page.getByText('User with this email already exists')).toBeVisible();
  });

  test('should successfully register a new user', async ({ page }) => {
    const uniqueEmail = `test${Date.now()}@example.com`;
    
    await page.getByLabel('Username').fill('newuser');
    await page.getByLabel('Email').fill(uniqueEmail);
    await page.getByLabel('Password').fill('Password123!');
    await page.getByLabel('Confirm Password').fill('Password123!');
    
    await page.getByRole('button', { name: 'Register' }).click();
    
    await expect(page).toHaveURL('/dashboard');
    
    await expect(page.getByText('Welcome, newuser')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.getByText('Already have an account? Login').click();
    
    await expect(page).toHaveURL('/login');
  });
}); 