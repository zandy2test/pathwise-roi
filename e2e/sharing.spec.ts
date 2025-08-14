import { test, expect } from '@playwright/test';

test.describe('Sharing Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Complete a calculation to get to results page
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
    await expect(page).toHaveURL('/results');
  });

  test('should display share card with QR code', async ({ page }) => {
    // Share card should be visible
    await expect(page.locator('text=Share Your Results')).toBeVisible();
    
    // QR code should be present
    await expect(page.locator('canvas').first()).toBeVisible();
    
    // Share buttons should be present
    await expect(page.locator('[aria-label="Share on Twitter"]')).toBeVisible();
    await expect(page.locator('[aria-label="Share on Facebook"]')).toBeVisible();
    await expect(page.locator('[aria-label="Share on LinkedIn"]')).toBeVisible();
    await expect(page.locator('[aria-label="Share on Reddit"]')).toBeVisible();
  });

  test('should open Twitter share in new tab', async ({ page, context }) => {
    // Listen for new page
    const pagePromise = context.waitForEvent('page');
    
    // Click Twitter share
    await page.click('[aria-label="Share on Twitter"]');
    
    // Check new tab opened with Twitter
    const newPage = await pagePromise;
    await expect(newPage).toHaveURL(/twitter\.com|x\.com/);
  });

  test('should open Facebook share in new tab', async ({ page, context }) => {
    // Listen for new page
    const pagePromise = context.waitForEvent('page');
    
    // Click Facebook share
    await page.click('[aria-label="Share on Facebook"]');
    
    // Check new tab opened with Facebook
    const newPage = await pagePromise;
    await expect(newPage).toHaveURL(/facebook\.com/);
  });

  test('should open LinkedIn share in new tab', async ({ page, context }) => {
    // Listen for new page
    const pagePromise = context.waitForEvent('page');
    
    // Click LinkedIn share
    await page.click('[aria-label="Share on LinkedIn"]');
    
    // Check new tab opened with LinkedIn
    const newPage = await pagePromise;
    await expect(newPage).toHaveURL(/linkedin\.com/);
  });

  test('should open Reddit share in new tab', async ({ page, context }) => {
    // Listen for new page
    const pagePromise = context.waitForEvent('page');
    
    // Click Reddit share
    await page.click('[aria-label="Share on Reddit"]');
    
    // Check new tab opened with Reddit
    const newPage = await pagePromise;
    await expect(newPage).toHaveURL(/reddit\.com/);
  });

  test('should copy link to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    
    // Click copy link button
    await page.click('[aria-label="Copy link"]');
    
    // Check for success message
    await expect(page.locator('text=Link copied!')).toBeVisible();
  });

  test('should generate share card image', async ({ page }) => {
    // Check that canvas is rendered
    const canvas = page.locator('#share-card-canvas');
    await expect(canvas).toBeVisible();
    
    // Verify canvas has content
    const canvasBox = await canvas.boundingBox();
    expect(canvasBox?.width).toBeGreaterThan(0);
    expect(canvasBox?.height).toBeGreaterThan(0);
  });
});
