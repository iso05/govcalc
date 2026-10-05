import { test, expect } from '@playwright/test';

test.describe('Hisobchi Homepage and Navigation E2E', () => {
  test('should load homepage with correct headlines and branding', async ({ page }) => {
    await page.goto('/');

    // Check primary headline
    await expect(page.locator('h1')).toContainText('Rasmiy to‘lovlarni tushunish va hisoblash oson.');

    // Check search input placeholder
    const searchInput = page.locator('#universal-search-input');
    await expect(searchInput).toBeVisible();

    // Check categories section exists
    await expect(page.locator('#categories')).toBeVisible();

    // Check how it works section
    await expect(page.locator('#how-it-works')).toBeVisible();

    // Check FAQ section
    await expect(page.locator('#faq')).toBeVisible();
  });

  test('should support search interaction and show live results', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.locator('#universal-search-input');
    await searchInput.fill('sud boji');

    // Live search results dropdown should appear
    await expect(page.locator('text=Topilgan kalkulyatorlar')).toBeVisible();
  });

  test('should navigate to calculator directory and filter by category', async ({ page }) => {
    await page.goto('/calculators');

    await expect(page.locator('h1')).toContainText('Barcha rasmiy kalkulyatorlar katalogi');

    // Click on Sud category filter
    await page.getByRole('link', { name: 'Sud', exact: true }).click();
    await expect(page).toHaveURL(/category=sud/);
  });

  test('should open GOV-001 birth certificate calculator and compute prototype result', async ({ page }) => {
    await page.goto('/calculators/fhdyo-tugilganlik-guvohnomasi');

    // Check title matches "Tug‘ilganlik guvohnomasi"
    await expect(page.locator('h1')).toContainText('Tug‘ilganlik guvohnomasi');

    // Submit calculation
    await page.click('#calculate-submit-btn');

    // Check verified result renders with exact legal amount (59 400 so‘m)
    await expect(page.locator('text=59 400 so‘m').first()).toBeVisible();
    await expect(page.locator('text=Davlat boji').first()).toBeVisible();
    await expect(page.locator('text=Gerb yig‘imi').first()).toBeVisible();
    await expect(page.locator('text=Hisoblash formulasi').first()).toBeVisible();
  });
});
