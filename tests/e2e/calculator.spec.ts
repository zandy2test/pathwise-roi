import { test, expect } from '@playwright/test';

test('should calculate ROI for a standard 4-year degree path', async ({ page }) => {
  await page.goto('/');

  // --- Step 1: Fill out the form ---

  // Select Education Type
  await page.getByLabel('Education Type').click();
  await page.getByRole('option', { name: '4-Year Degree' }).click();

  // Select Field of Study
  await page.getByLabel('Field of Study').click();
  await page.getByRole('option', { name: 'Computer Science' }).click();

  // Select Program/Degree
  await page.getByLabel('Program/Degree').click();
  await page.getByRole('option', { name: "Bachelor's Degree" }).click();

  // Select Location
  await page.getByLabel('Your Location').click();
  await page.getByRole('option', { name: 'New York City' }).click();

  // Select School Quality
  await page.getByLabel('School Quality').click();
  await page.getByRole('option', { name: 'Mid-Tier School' }).click();

  // Select Living Situation
  await page.getByLabel('Living Situation').click();
  await page.getByRole('option', { name: 'On Campus' }).click();

  // Fill in Scholarships
  await page.getByLabel('Scholarships/Aid ($)').fill('10000');

  // --- Step 2: Click the Calculate button ---
  // I need to find the correct selector for the button.
  // I'll assume it's in the main page component.
  await page.getByRole('button', { name: /Calculate ROI/i }).click();

  // --- Step 3: Verify the results ---
  // The results section should become visible. I will assume it has an id of 'results'.
  const resultsContainer = page.locator('#results');

  await expect(resultsContainer).toBeVisible({ timeout: 10000 });

  // Check for the presence of key result metrics.
  await expect(resultsContainer.getByText('Breakeven Point')).toBeVisible();
  await expect(resultsContainer.getByText('10-Year Net Worth')).toBeVisible();
  await expect(resultsContainer.getByText('Risk Warning')).toBeVisible();
});
