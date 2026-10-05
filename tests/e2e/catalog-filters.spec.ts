import { test, expect } from '@playwright/test';

test('every category and filter can be clicked including empty combinations', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  // Start on another category so the first assertion waits for a real navigation.
  // Clicking an already-active server-rendered link can complete during hydration.
  await page.goto('/calculators?category=hujjatlar');
  const categories = page.getByRole('navigation', { name: 'Kalkulyator yo‘nalishlari' });
  const filters = page.getByRole('navigation', { name: 'Kalkulyator filtrlari' });
  for (const name of ['Barchasi', 'Sud', 'Notarius', 'Avtomobil', 'Uy-joy', 'Soliq', 'Bojxona', 'Hujjatlar', 'Biznes', 'Kommunal', 'Boshqa']) {
    const link = categories.getByRole('link', { name, exact: true });
    await link.click();
    await expect(link).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('main h1')).toBeVisible();
    if (!['Barchasi', 'Hujjatlar'].includes(name)) await expect(page.getByText('Bu yo‘nalish tayyorlanmoqda', { exact: true })).toBeVisible();
  }
  // Boshqa has no entries: every status must render an empty state without a server exception.
  for (const name of ['PRO', 'FREE', 'Eng yangi', 'Ommabop', 'Barchasi']) {
    const link = filters.getByRole('link', { name, exact: true });
    await link.click();
    await expect(link).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('main h1')).toBeVisible();
  }
  await categories.getByRole('link', { name: 'Hujjatlar', exact: true }).click();
  await expect(categories.getByRole('link', { name: 'Hujjatlar', exact: true })).toHaveAttribute('aria-current', 'page');
  await filters.getByRole('link', { name: 'PRO', exact: true }).click();
  await expect(page.getByText('PRO kalkulyatorlar hali qo‘shilmagan')).toBeVisible();
  await filters.getByRole('link', { name: 'FREE', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Tug‘ilganlik guvohnomasi', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('empty search suggestions navigate, category reset preserves query, and clear filters resets input', async ({ page }) => {
  await page.goto('/calculators?category=boshqa&search=zzznothing');
  await expect(page.getByText('Hech narsa topilmadi', { exact: true })).toBeVisible();
  await page.getByRole('navigation', { name: 'Kalkulyator yo‘nalishlari' }).getByRole('link', { name: 'Barchasi', exact: true }).click();
  await expect(page).toHaveURL(/search=zzznothing/);
  await expect(page.getByRole('textbox', { name: 'Kalkulyator qidirish' })).toHaveValue('zzznothing');
  await page.getByRole('link', { name: 'tug‘ilganlik guvohnomasi', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Tug‘ilganlik guvohnomasi', exact: true })).toBeVisible();
  await page.getByRole('navigation', { name: 'Kalkulyator filtrlari' }).getByRole('link', { name: 'PRO', exact: true }).click();
  await expect(page.getByText('Hech narsa topilmadi', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Filtrlarni tozalash' }).click();
  await expect(page.getByRole('textbox', { name: 'Kalkulyator qidirish' })).toHaveValue('');
  await expect(page.getByRole('heading', { name: 'Tug‘ilganlik guvohnomasi', exact: true })).toBeVisible();
});
