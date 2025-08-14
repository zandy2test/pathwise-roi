import { test, expect } from '@playwright/test';

test.describe('Calculator Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete full calculation flow', async ({ page }) => {
    // Navigate to calculator
    await page.click('text=Calculate My Scam Score™');
    // Should change to calculator mode on the same page
    await expect(page.locator('text=Calculate Your Education ROI')).toBeVisible();

    // Select education type
    await page.click('[data-testid="education-type-select"]');
    await page.click('text=Traditional College (4-year)');

    // Select field
    await page.click('[data-testid="field-select"]');
    await page.click('text=Computer Science');

    // Select program
    await page.click('[data-testid="program-select"]');
    await page.click('text=Software Engineering');

    // Fill in location
    await page.click('[data-testid="location-select"]');
    await page.click('text=San Francisco, CA');

    // Select school tier
    await page.click('[data-testid="school-tier-select"]');
    await page.click('text=State School');

    // Select living cost
    await page.click('[data-testid="living-cost-select"]');
    await page.click('text=On Campus');

    // Enter scholarship amount
    await page.fill('[data-testid="scholarships-input"]', '10000');

    // Click calculate button
    await page.click('text=Calculate ROI');

    // Verify results appear on the same page
    await expect(page.locator('text=Your Results')).toBeVisible();
  });

  test('should show validation errors for incomplete form', async ({ page }) => {
    // First navigate to calculator mode
    await page.click('text=Calculate My Scam Score™');
    
    // Try to calculate without filling form
    await page.click('text=Calculate ROI');
    
    // Should show validation errors
    await expect(page.locator('text=Please select an education type')).toBeVisible();
  });

  test('should update live indicators while filling form', async ({ page }) => {
    // Navigate to calculator mode
    await page.click('text=Calculate My Scam Score™');
    
    // Select trade school
    await page.click('[data-testid="education-type-select"]');
    await page.click('text=Trade School');
    
    // Should show positive indicator
    await expect(page.locator('text=SMART CHOICE!')).toBeVisible();
    
    // Select expensive option
    await page.click('[data-testid="education-type-select"]');
    await page.click('text=Traditional College (4-year)');
    
    await page.click('[data-testid="school-tier-select"]');
    await page.click('text=Elite Private');
    
    // Should show warning when debt is high
    await expect(page.locator('text=Six-figure debt')).toBeVisible();
  });

  test('should handle comparison mode', async ({ page }) => {
    // Navigate to calculator mode
    await page.click('text=Calculate My Scam Score™');
    
    // Complete first calculation
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
    await page.click('text=Calculate ROI');
    
    // Results should appear on same page
    await expect(page.locator('text=Your Results')).toBeVisible();
    await page.click('text=Compare with Another Path');
    
    // Should show comparison mode
    await expect(page.locator('text=Compare Education Paths')).toBeVisible();
    
    // Complete second calculation
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
    await page.click('text=Compare Paths');
    
    // Should show comparison results
    await expect(page.locator('text=Winner')).toBeVisible();
  });
});
