import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test('should work on iPhone mobile viewport', async ({ page }) => {
    // Set iPhone 12 viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    
    // Landing page should be responsive
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Calculate Your ROI')).toBeVisible();
  });

  test('should complete calculation on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/calculate');
    
    // All form elements should be accessible on mobile
    await page.click('[data-testid="education-type-select"]');
    await page.click('text=Trade School');
    
    await page.click('[data-testid="field-select"]');
    await page.click('text=Electrician');
    
    await page.click('[data-testid="location-select"]');
    await page.click('text=Austin, TX');
    
    await page.click('[data-testid="school-tier-select"]');
    await page.click('text=Local Program');
    
    await page.click('[data-testid="living-cost-select"]');
    await page.click('text=Living at Home');
    
    await page.click('text=Calculate My Fate');
    
    // Results should display properly on mobile
    await expect(page).toHaveURL('/results');
    await expect(page.locator('text=Your Education ROI Analysis')).toBeVisible();
  });

  test('should have touch-friendly share buttons on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Complete a calculation first
    await page.goto('/calculate');
    await page.click('[data-testid="education-type-select"]');
    await page.click('text=Trade School');
    await page.click('[data-testid="field-select"]');
    await page.click('text=Electrician');
    await page.click('[data-testid="location-select"]');
    await page.click('text=Austin, TX');
    await page.click('[data-testid="school-tier-select"]');
    await page.click('text=Local Program');
    await page.click('[data-testid="living-cost-select"]');
    await page.click('text=Living at Home');
    await page.click('text=Calculate My Fate');
    
    // Share buttons should be visible and clickable
    const shareButton = page.locator('[aria-label="Share on Twitter"]');
    await expect(shareButton).toBeVisible();
    
    // Check button size is touch-friendly (min 44x44px)
    const box = await shareButton.boundingBox();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('should handle landscape orientation', async ({ page }) => {
    // Set landscape viewport
    await page.setViewportSize({ width: 812, height: 375 });
    
    await page.goto('/');
    
    // Content should still be visible and accessible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Calculate Your ROI')).toBeVisible();
  });

  test('should have readable text on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    
    // Check font sizes are appropriate for mobile
    const heading = page.locator('h1').first();
    const fontSize = await heading.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    
    // Font size should be at least 16px for readability
    const fontSizeNum = parseInt(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(16);
  });

  test('should handle mobile keyboard properly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/calculate');
    
    // Focus on scholarship input
    await page.click('[data-testid="scholarships-input"]');
    
    // Check that input is focused
    const isFocused = await page.evaluate(() => {
      const input = document.querySelector('[data-testid="scholarships-input"]');
      return document.activeElement === input;
    });
    
    expect(isFocused).toBeTruthy();
    
    // Type a value
    await page.fill('[data-testid="scholarships-input"]', '5000');
    await expect(page.locator('[data-testid="scholarships-input"]')).toHaveValue('5000');
  });
});

test.describe('Tablet Responsiveness', () => {
  test('should work on tablet viewport', async ({ page }) => {
    // Set iPad viewport
    await page.setViewportSize({ width: 820, height: 1180 });
    await page.goto('/');
    
    // Check layout adapts to tablet
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Calculate Your ROI')).toBeVisible();
    
    // Navigate to calculator
    await page.click('text=Calculate Your ROI');
    await expect(page).toHaveURL('/calculate');
    
    // Form should be usable on tablet
    await expect(page.locator('[data-testid="education-type-select"]')).toBeVisible();
  });

  test('should display results properly on tablet', async ({ page }) => {
    // Set iPad viewport
    await page.setViewportSize({ width: 820, height: 1180 });
    
    // Complete calculation
    await page.goto('/calculate');
    await page.click('[data-testid="education-type-select"]');
    await page.click('text=Traditional College (4-year)');
    await page.click('[data-testid="field-select"]');
    await page.click('text=Computer Science');
    await page.click('[data-testid="program-select"]');
    await page.click('text=Software Engineering');
    await page.click('[data-testid="location-select"]');
    await page.click('text=San Francisco, CA');
    await page.click('[data-testid="school-tier-select"]');
    await page.click('text=State School');
    await page.click('[data-testid="living-cost-select"]');
    await page.click('text=On Campus');
    await page.click('text=Calculate My Fate');
    
    // Results and charts should display correctly
    await expect(page.locator('text=Your Education ROI Analysis')).toBeVisible();
    
    // Chart should be visible
    const chart = page.locator('.recharts-responsive-container');
    await expect(chart).toBeVisible();
  });
});
