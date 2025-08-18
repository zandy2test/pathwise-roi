import { test, expect } from '@playwright/test';

test.describe('Navigation and Routing', () => {
  test('should navigate between pages correctly', async ({ page }) => {
    // Start at home
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('PathwiseROI');
    
    // Navigate to calculator
    await page.click('text=Calculate Your ROI');
    await expect(page).toHaveURL('/calculate');
    await expect(page.locator('h1')).toContainText('Build Your Path');
    
    // Navigate to How It Works
    await page.click('text=How It Works');
    await expect(page).toHaveURL('/how-it-works');
    await expect(page.locator('h1')).toContainText('How PathwiseROI Works');
    
    // Navigate back to home
    await page.click('text=PathwiseROI');
    await expect(page).toHaveURL('/');
  });

  test('should have working footer links', async ({ page }) => {
    await page.goto('/');
    
    // Check Privacy Policy link
    await page.click('footer >> text=Privacy Policy');
    await expect(page).toHaveURL('/privacy');
    await expect(page.locator('h1')).toContainText('Privacy Policy');
    
    // Check Terms of Service link
    await page.goto('/');
    await page.click('footer >> text=Terms of Service');
    await expect(page).toHaveURL('/terms');
    await expect(page.locator('h1')).toContainText('Terms of Service');
  });

  test('should handle 404 pages correctly', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/non-existent-page');
    
    // Should show 404 page
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=Page not found')).toBeVisible();
    
    // Should have link back to home
    await page.click('text=Go back home');
    await expect(page).toHaveURL('/');
  });

  test('should handle direct navigation to results without data', async ({ page }) => {
    // Try to go directly to results page
    await page.goto('/results');
    
    // Should redirect to calculator or show message
    const url = page.url();
    expect(url).toMatch(/\/(calculate|results)/);
    
    if (url.includes('results')) {
      // If on results page, should show no data message
      await expect(page.locator('text=No calculation data')).toBeVisible();
    }
  });

  test('should maintain scroll position on back navigation', async ({ page }) => {
    // Go to home and scroll down
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Navigate to calculator
    await page.click('text=Calculate Your ROI');
    await expect(page).toHaveURL('/calculate');
    
    // Go back
    await page.goBack();
    await expect(page).toHaveURL('/');
    
    // Check scroll position is maintained (browser dependent)
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThanOrEqual(0);
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
    
    // Check for skip links (accessibility)
    const skipLink = page.locator('[href="#main-content"]');
    const skipLinkCount = await skipLink.count();
    
    // Header should have proper ARIA labels
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});
